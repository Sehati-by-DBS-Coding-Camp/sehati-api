const AssessmentRepository = require('../../domain/repository/AssessmentRepository');

class AssessmentRepositoryMySQL extends AssessmentRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async create(data) {
    // console.log('repo: ', data);
    const sql = `
      INSERT INTO dass21 (
        dassId, userId,
        d1, d2, d3, d4, d5, d6, d7,
        a1, a2, a3, a4, a5, a6, a7,
        s1, s2, s3, s4, s5, s6, s7,
        keluhan_tambahan,
        depresi_kategori, depresi_score,
        kecemasan_kategori, kecemasan_score,
        stres_kategori, stres_score
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, LEFT(?, 256), ?, ?, ?, ?, ?, ?)
    `;
    await this.pool.execute(
      sql,
      [
        data.id, data.userId,
        data.d1, data.d2, data.d3, data.d4, data.d5, data.d6, data.d7,
        data.a1, data.a2, data.a3, data.a4, data.a5, data.a6, data.a7,
        data.s1, data.s2, data.s3, data.s4, data.s5, data.s6, data.s7,
        data.keluhanTambahan,
        data.depresiKategori, data.depresiScore,
        data.kecemasanKategori, data.kecemasanScore,
        data.stresKategori, data.stresScore,
      ],
    );
  }

  async getAssessmentByUserId(userId) {
    const [rows] = await this.pool.execute('SELECT * FROM dass21 WHERE userId = ?', [userId]);
    if (rows.length === 0) {
      const error = new Error('User not found');
      error.code = 'USER_NOT_FOUND';
      throw error;
    }
    return rows[0];
  }
}

module.exports = AssessmentRepositoryMySQL;
