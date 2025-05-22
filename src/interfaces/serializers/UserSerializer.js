module.exports = {
  serialize(user) {
    return {
      statusCode: 201,
      error: false,
      message: 'user created',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  },
};
