module.exports = {
  serialize({ data, news, code }) {
    return {
      statusCode: code,
      error: false,
      message: 'success',
      data: {
        id: data.id,
        userId: data.userId,
        assessment: {
          D: [data.d1, data.d2, data.d3, data.d4, data.d5, data.d6, data.d7],
          A: [data.a1, data.a2, data.a3, data.a4, data.a5, data.a6, data.a7],
          S: [data.s1, data.s2, data.s3, data.s4, data.s5, data.s6, data.s7],
          keluhanTambahan: data.keluhanTambahan,
        },
        hasil: {
          depresi: {
            kategori: data.depresiKategori,
            score: data.depresiScore,
          },
          kecemasan: {
            kategori: data.kecemasanKategori,
            score: data.kecemasanScore,
          },
          stres: {
            kategori: data.stresKategori,
            score: data.stresScore,
          },
          rekomendasi: data.rekomendasi || 'null',
        },
        news: news || [],
        createdAt: data.createdAt || new Date().toISOString(),
      },
    };
  },
};
