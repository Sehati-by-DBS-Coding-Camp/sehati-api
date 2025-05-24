const Boom = require('@hapi/boom');
const { nanoid } = require('nanoid');

const resgisterSerializer = require('../serializers/RegisterSerializer');
const loginSerializer = require('../serializers/loginSerializer');

class UsersController {
  constructor({ registerUser, loginUser, userSerializer }) {
    this.registerUser = registerUser;
    this.loginUser = loginUser;
    this.userSerializer = userSerializer;
  }

  async register(request, h) {
    try {
      const id = nanoid(10);

      const payload = { ...request.payload, id };

      await this.registerUser.execute(payload);

      return h.response(resgisterSerializer.serialize(payload, 201)).code(201);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') return Boom.conflict('Email already registered');
      return Boom.badImplementation(err.message);
    }
  }

  async login(request, h) {
    try {
      const { accessToken, user } = await this.loginUser.execute(request.payload);

      return h.response(loginSerializer.serialize({ token: accessToken, user, code: 200 }))
        .code(200);
    } catch (err) {
      return Boom.unauthorized('Invalid credentials');
    }
  }
}

module.exports = UsersController;
