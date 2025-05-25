module.exports = {
  serialize({ user, code, token }) {
    return {
      statusCode: code,
      error: false,
      message: 'success',
      data: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        accessToken: token,
      },
    };
  },
};
