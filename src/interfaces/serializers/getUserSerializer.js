module.exports = {
  serialize({ user, code }) {
    return {
      statusCode: code,
      error: false,
      message: 'success',
      data: {
        userId: user.userId,
        name: user.name,
        gender: user.gender,
        birth: user.birth,
        email: user.email,
        createdAt: user.createadt,
        updatedAt: user.updateadt,
      },
    };
  },
};
