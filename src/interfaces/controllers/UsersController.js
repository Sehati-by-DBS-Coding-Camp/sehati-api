const Boom = require('@hapi/boom');
const { nanoid } = require('nanoid');

const resgisterSerializer = require('../serializers/registrationSerializer');
const loginSerializer = require('../serializers/loginSerializer');
const getUserSerializer = require('../serializers/getUserSerializer');

class UsersController {
  constructor({
    registerUser, loginUser, getUserById, userSerializer, updateUserById,
  }) {
    this.registerUser = registerUser;
    this.loginUser = loginUser;
    this.getUserById = getUserById;
    this.userSerializer = userSerializer;
    this.updateUserById = updateUserById;
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

  async profile(request, h) {
    try {
      const { userId } = request.params;
      const user = await this.getUserById.execute(userId);

      return h.response(getUserSerializer.serialize({ user, code: 200 }))
        .code(200);
    } catch (err) {
      if (err.code === 'USER_NOT_FOUND') {
        return Boom.notFound('User id not found');
      }
      return Boom.badImplementation(err.message);
    }
  }

  async updateUserProfile(request, h) {
    try {
      const { userId } = request.params;
      const payload = { ...request.payload };
      const userData = {
        userId,
        ...payload,
      };

      const user = await this.updateUserById.execute(userData);

      return h.response(getUserSerializer.serialize({ user, code: 200 }))
        .code(200);
    } catch (err) {
      if (err.code === 'USER_NOT_FOUND') {
        return Boom.notFound('User id not found');
      }

      if (err.code === 'NO_CHANGES') {
        return Boom.badRequest('No changes made to the user');
      }

      console.log(err);
      return Boom.badImplementation(err.message);
    }
  }
}

module.exports = UsersController;
