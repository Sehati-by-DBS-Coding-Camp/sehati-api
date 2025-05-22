// Ini hanya deklarasi kontrak fungsi
const {
  createUser, getUserById, updateUser, deleteUser,
} = require('../../interfaces/repositories/UserRepositorySql');

const save = async (user) => {
  const result = await createUser(user);
  return result;
};

module.exports = {
  save,
};
