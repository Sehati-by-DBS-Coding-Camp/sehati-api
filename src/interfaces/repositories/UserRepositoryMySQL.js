const UserRepository = require('../../domain/repository/UserRepository');

class UserRepositoryMySQL extends UserRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async addUser(user) {
    const sql = 'INSERT INTO user (userId, name, gender, birth, email, password) VALUES (?, ?, ?, ?, ?, ?)';
    await this.pool.execute(
      sql,
      [user.id, user.name, user.gender, user.birth, user.email, user.password],
    );
  }

  async getUserByEmail(email) {
    const [rows] = await this.pool.execute('SELECT * FROM user WHERE email = ?', [email]);
    return rows[0];
  }
}
module.exports = UserRepositoryMySQL;
