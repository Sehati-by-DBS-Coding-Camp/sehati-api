const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const bcrypt = require('bcrypt');

const logger = require('../../logger/logger');
const pool = require('../../db/mysql/connection');
const { calculateDASS21Score } = require('../../../interfaces/utils/calculateDASS21S');

const UserRepositoryMySQL = require('../../../interfaces/repositories/UserRepositoryMySQL');
const AssessmentRepositoryMySQL = require('../../../interfaces/repositories/AssessmentRepositoryMySQL');
const JwtAccessTokenManager = require('../../../interfaces/security/JwtAccessTokenManager');

const RegisterUser = require('../../../application/use_cases/RegisterUser');
const LoginUser = require('../../../application/use_cases/LoginUser');
const GetUserById = require('../../../application/use_cases/GetUserById');
const UpdateUserById = require('../../../application/use_cases/UpdateUserById');
const GetNews = require('../../../application/use_cases/GetNews');

const NewAssessment = require('../../../application/use_cases/NewAssessment');
const GetAssessmentByUserId = require('../../../application/use_cases/GetAssessmentByUserId');
const GetAssessmentById = require('../../../application/use_cases/GetAssessmentById');

const UsersController = require('../../../interfaces/controllers/UsersController');
const AssessmentController = require('../../../interfaces/controllers/AssessmentController');
const { userRoutes, assessmentRoutes } = require('../../../interfaces/routes/routes');

const init = async () => {
  // Repository
  const userRepository = new UserRepositoryMySQL(pool);
  const assessmentRepository = new AssessmentRepositoryMySQL(pool);

  const accessTokenManager = new JwtAccessTokenManager(Jwt.token);
  const registerUser = new RegisterUser({ userRepository, passwordHasher: bcrypt });
  const loginUser = new LoginUser({ userRepository, passwordHasher: bcrypt, accessTokenManager });
  const getUserById = new GetUserById(userRepository);
  const updateUserById = new UpdateUserById(userRepository);
  const newAssessment = new NewAssessment(assessmentRepository);
  const getAssessmentByUserId = new GetAssessmentByUserId(assessmentRepository, calculateDASS21Score);
  const getAssessmentById = new GetAssessmentById(assessmentRepository, calculateDASS21Score);

  // Initialize UsersController with use cases
  const usersController = new UsersController({
    registerUser,
    loginUser,
    getUserById,
    updateUserById,
  });
  const assessmentController = new AssessmentController({
    newAssessment,
    GetNews,
    getAssessmentByUserId,
    getAssessmentById,
  });

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

  server.route(userRoutes(usersController));
  server.route(assessmentRoutes(assessmentController));

  return server;
};

process.on('unhandledRejection', (err) => {
  logger.error(err);
  process.exit(1);
});

module.exports = init;
