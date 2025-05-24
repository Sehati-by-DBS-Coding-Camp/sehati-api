const AccessTokenManager = require('../../application/security/AccessTokenManager');

class JwtAccessTokenManager extends AccessTokenManager {
  constructor(jwt) {
    super();
    this.jwt = jwt;
  }

  async createAccessToken(payload) {
    return this.jwt.generate(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  }
}

module.exports = JwtAccessTokenManager;
