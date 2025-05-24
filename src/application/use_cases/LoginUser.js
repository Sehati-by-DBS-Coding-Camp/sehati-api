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
    if (!user) throw new Error('Invalid user');

    const match = await this.passwordHasher.compare(password, user.password);
    if (!match) throw new Error('Invalid password');

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
