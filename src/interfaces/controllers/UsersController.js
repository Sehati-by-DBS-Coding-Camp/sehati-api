const CreateUser = require('../../application/use_cases/CreateUser');
const UserSerializer = require('../serializers/UserSerializer');

module.exports = {
  async createUser(request, h) {
    const {
      name, email, gender,
      birth, password,
    } = request.payload;

    // Validasi data (misalnya pastikan email tidak kosong)
    if (!name || !email) {
      return h.response({ error: 'Name and email are required' }).code(400);
    }

    const data = {
      name,
      email,
      gender,
      birth,
      password,
    };

    // Panggil use case untuk membuat user
    const user = await CreateUser.execute(data);

    // Return response dengan serialized user
    return h.response(UserSerializer.serialize(user)).code(201);
  },
};
