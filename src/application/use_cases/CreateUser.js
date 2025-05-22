const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');

const User = require('../../domain/model/User');
// const userRepo = require('../../domain/repository/userRepository');
const userRepo = require('../../interfaces/repositories/UserRepositorySql');

module.exports = {
  async execute(data) {
    const {
      name, email, gender, birth, password,
    } = data;

    // UUID
    const id = nanoid(10);

    // hash password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Membuat instance user baru
    const user = new User({
      id, name, email, gender, birth, password: hashedPassword,
    });

    // Simpan user ke repository
    const result = await userRepo.createUser({ ...user });

    return result;
  },
};
