module.exports = {
  serialize(user, code) {
    return {
      statusCode: code,
      error: false,
      message: 'user created',
      data: {
        userId: user.id,
        name: user.name,
        email: user.email,
      },
    };
  },
};
