// const Boom = require('@hapi/boom');

class LoginUser {
  constructor({ userRepository, passwordHasher, accessTokenManager }) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.accessTokenManager = accessTokenManager;
  }

  async execute({ email, password }) {
    // Validasi response perlu diperbaiki tiap kondisi
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      const error = new Error('User not found');
      error.code = 'USER_NOT_FOUND';
      throw error;
    }

    const match = await this.passwordHasher.compare(password, user.password);
    if (!match) {
      const error = new Error('Invalid password');
      error.code = 'INVALID_PASSWORD';
      throw error;
    }

    try {
      const accessToken = await this.accessTokenManager.createAccessToken({
        userId: user.userId, name: user.name, email: user.email,
      });

      return { accessToken, user };
    } catch (err) {
      console.error('Error createAccessToken:', err);
      throw err; // biar error tetap naik ke atas
    }
  }
}

module.exports = LoginUser;
