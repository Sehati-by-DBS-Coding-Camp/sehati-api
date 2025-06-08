const axios = require('axios');
const Boom = require('@hapi/boom');
const { error } = require('winston');

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

      const url = 'http://35.219.5.8:8080/dass21/score';
      const data = {
        D: [d1, d2, d3, d4, d5, d6, d7],
        A: [a1, a2, a3, a4, a5, a6, a7],
        S: [a1, a2, a3, a4, a5, a6, a7],
        keluhanTambahan,
      };
      const response = await axios.post(url, data);
      // console.log(response.data);

      const depresiKategori = response.data.categories.Depresi;
      const kecemasanKategori = response.data.categories.Kecemasan;
      const stresKategori = response.data.categories.Stres;

      const depresiScore = response.data.scores.Depresi;
      const kecemasanScore = response.data.scores.Kecemasan;
      const stresScore = response.data.scores.Stres;

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
