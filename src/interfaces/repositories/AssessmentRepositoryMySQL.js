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
        stres_kategori, stres_score, rekomendasi, predicted_label
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, LEFT(?, 256), ?, ?, ?, ?, ?, ?, LEFT(?, 2000), ?)
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
        data.rekomendasi, data.predictedLabel,
      ],
    );
  }

  async getByUserId(userId) {
    const [rows] = await this.pool.execute('SELECT dassId, userId, d1, d2, d3, d4, d5, d6, d7, a1, a2, a3, a4, a5, a6, a7, s1, s2, s3, s4, s5, s6, s7, predicted_label, createdAt FROM dass21 WHERE userId = ?', [userId]);
    return rows;
  }

  async getById(dassId) {
    const [rows] = await this.pool.execute('SELECT dassId, userId, d1, d2, d3, d4, d5, d6, d7, a1, a2, a3, a4, a5, a6, a7, s1, s2, s3, s4, s5, s6, s7, predicted_label, rekomendasi, createdAt FROM dass21 WHERE dassId = ?', [dassId]);
    if (rows.length === 0) {
      const error = new Error('assaessment id not found');
      error.code = 'ID_NOT_FOUND';
      throw error;
    }
    // console.log('rows: ', rows);
    return rows;
  }
}

module.exports = AssessmentRepositoryMySQL;
