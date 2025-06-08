module.exports = class Assessment {
  constructor({
    id, userId,
    d1, d2, d3, d4, d5, d6, d7,
    a1, a2, a3, a4, a5, a6, a7,
    s1, s2, s3, s4, s5, s6, s7,
    keluhanTambahan,
    depresiKategori, depresiScore,
    kecemasanKategori, kecemasanScore,
    stresKategori, stresScore,
  }) {
    this.id = id;
    this.userId = userId;
    this.d1 = d1;
    this.d2 = d2;
    this.d3 = d3;
    this.d4 = d4;
    this.d5 = d5;
    this.d6 = d6;
    this.d7 = d7;
    this.a1 = a1;
    this.a2 = a2;
    this.a3 = a3;
    this.a4 = a4;
    this.a5 = a5;
    this.a6 = a6;
    this.a7 = a7;
    this.s1 = s1;
    this.s2 = s2;
    this.s3 = s3;
    this.s4 = s4;
    this.s5 = s5;
    this.s6 = s6;
    this.s7 = s7;
    this.keluhanTambahan = keluhanTambahan;
    this.depresiKategori = depresiKategori;
    this.depresiScore = depresiScore;
    this.kecemasanKategori = kecemasanKategori;
    this.kecemasanScore = kecemasanScore;
    this.stresKategori = stresKategori;
    this.stresScore = stresScore;
  }
};
