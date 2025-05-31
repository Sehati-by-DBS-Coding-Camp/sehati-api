class UpdateUserById {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const user = await this.userRepository.updateUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}

module.exports = UpdateUserById;
