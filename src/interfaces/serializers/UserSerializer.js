class UserSerializer {
  static serialize(user) {
    return {
      id: user.id,
      name: user.name,
      gender: user.gender,
      birth: user.birth,
      email: user.email,
    };
  }
}

module.exports = UserSerializer;
