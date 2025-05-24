const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const bcrypt = require('bcrypt');

const pool = require('../../db/mysql/connection');
const UserRepositoryMySQL = require('../../../interfaces/repositories/UserRepositoryMySQL');
const JwtAccessTokenManager = require('../../../interfaces/security/JwtAccessTokenManager');
const RegisterUser = require('../../../application/use_cases/RegisterUser');
const LoginUser = require('../../../application/use_cases/LoginUser');
const UsersController = require('../../../interfaces/controllers/UsersController');
const routes = require('../../../interfaces/routes/routes');

const init = async () => {
  const userRepository = new UserRepositoryMySQL(pool);
  const accessTokenManager = new JwtAccessTokenManager(Jwt.token);
  const registerUser = new RegisterUser({ userRepository, passwordHasher: bcrypt });
  const loginUser = new LoginUser({ userRepository, passwordHasher: bcrypt, accessTokenManager });
  const usersController = new UsersController({ registerUser, loginUser });

  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // Register JWT plugin
  await server.register(Jwt);

  // Define JWT auth strategy
  server.auth.strategy('jwt', 'jwt', {
    keys: process.env.JWT_SECRET,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400, // 4 hours
      timeSkewSec: 15,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: artifacts.decoded.payload, // langsung dari token
    }),
  });

  server.auth.default('jwt');

  server.route(routes(usersController));

  return server;
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

module.exports = init;
