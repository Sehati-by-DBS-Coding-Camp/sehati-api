class RegisterUser {
  constructor({ userRepository, passwordHasher }) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
  }

  async execute(payload) {
    const {
      id, name, gender, birth, email, password,
    } = payload;

    const hashedPassword = await this.passwordHasher.hash(password, 10);

    const user = {
      id, name, gender, birth, email, password: hashedPassword,
    };

    await this.userRepository.addUser(user);
    return user;
  }
}

module.exports = RegisterUser;
