const Boom = require('@hapi/boom');

const { calculateDASS21Score, getPredictedLabel, getRekomendation } = require('../../interfaces/utils/calculateDASS21S');

class NewAssessment {
  constructor(assessmentRepository) {
    this.assessmentRepository = assessmentRepository;
  }

  async execute(payload) {
    try {
      // Destructuring array ke variabel
      const [d1, d2, d3, d4, d5, d6, d7] = payload.D;
      const [a1, a2, a3, a4, a5, a6, a7] = payload.A;
      const [s1, s2, s3, s4, s5, s6, s7] = payload.S;
      const { id, userId, keluhanTambahan } = payload;

      const resultCalculateDASS21S = calculateDASS21Score({
        d1,
        d2,
        d3,
        d4,
        d5,
        d6,
        d7,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        s1,
        s2,
        s3,
        s4,
        s5,
        s6,
        s7,
      });

      const depresiKategori = resultCalculateDASS21S.depresi.severity;
      const kecemasanKategori = resultCalculateDASS21S.kecemasan.severity;
      const stresKategori = resultCalculateDASS21S.stres.severity;
      const rataRataKategori = resultCalculateDASS21S.rataRata.severity;

      const depresiScore = resultCalculateDASS21S.depresi.score;
      const kecemasanScore = resultCalculateDASS21S.kecemasan.score;
      const stresScore = resultCalculateDASS21S.stres.score;
      const rataRataScore = resultCalculateDASS21S.rataRata.score;

      const predictedLabel = await getPredictedLabel(keluhanTambahan);
      const rekomendasi = await getRekomendation({
        depresi: depresiScore,
        kecemasan: kecemasanScore,
        stres: stresScore,
        predictedLabel,
      });

      const assessmentData = {
        id,
        userId,
        d1,
        d2,
        d3,
        d4,
        d5,
        d6,
        d7,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        s1,
        s2,
        s3,
        s4,
        s5,
        s6,
        s7,
        keluhanTambahan,
        depresiKategori,
        depresiScore,
        kecemasanKategori,
        kecemasanScore,
        stresKategori,
        stresScore,
        rataRataKategori,
        rataRataScore,
        predictedLabel,
        rekomendasi,
      };

      // console.log('Hehe: ', assessmentData);

      await this.assessmentRepository.create(assessmentData);
      // console.log(newAssessment);
      return assessmentData;
    } catch (err) {
      return Boom.badRequest(err.message);
    }
  }
}

module.exports = NewAssessment;

// {{base_url}}/dass21/score
