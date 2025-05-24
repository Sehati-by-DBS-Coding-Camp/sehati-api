const Boom = require('@hapi/boom');
const pool = require('../../infrastructure/db/mysql/connection');

// CREATE
async function createUser(user) {
  const {
    id, name, email, gender, birth, password,
  } = user;

  try {
    await pool.execute(
      'INSERT INTO user (userId, name, gender, birth, email, password) VALUES (?, ?, ?, ?, ?, ?)',
      [id, name, gender, birth, email, password],
    );

    return user;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      if (error.message.includes('email')) { // Contoh: email unik
        throw Boom.conflict('Email sudah terdaftar. Silakan gunakan email lain.');
      }
      if (error.message.includes('userId')) { // Contoh: userId unik
        throw Boom.conflict('User ID sudah ada. Silakan gunakan ID lain.');
      }
      // Jika tidak bisa menentukan bidang spesifik, berikan pesan umum
      throw Boom.conflict('Data yang Anda masukkan sudah ada.');
    }

    console.error('Error creating user from pool:', error);
    throw Boom.internal('Terjadi kesalahan saat membuat user. Silakan coba lagi nanti.');
  }
}

async function findByEmail(user) {
  const { email } = user;
  try {
    await pool.execute(
      'SELECT * FROM user WHERE username = ?',
      [email],
    );

    return user;
  } catch (error) {
    console.error('Error creating user from pool:', error);
    throw Boom.internal('Terjadi kesalahan saat login. Silakan coba lagi nanti.');
  }
}

// UPDATE
async function updateUser(id, user) {
  const { name, email } = user;
  await pool.query(
    'UPDATE user SET name = ?, email = ? WHERE id = ?',
    [name, email, id],
  );
  return { id, ...user };
}

// DELETE
async function deleteUser(id) {
  await pool.query('DELETE FROM user WHERE id = ?', [id]);
  return { message: 'User deleted successfully' };
}

module.exports = {
  createUser,
  findByEmail,
  updateUser,
  deleteUser,
};
