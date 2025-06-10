module.exports = {
  serialize({ data, code }) {
    return {
      statusCode: code,
      error: false,
      message: 'success',
      data: {
        id: data.id,
        userId: data.userId,
        hasil: {
          depresi: {
            categorie: data.depresiKategori,
            score: data.depresiScore,
          },
          kecemasan: {
            categorie: data.kecemasanKategori,
            score: data.kecemasanScore,
          },
          stres: {
            categorie: data.stresKategori,
            score: data.stresScore,
          },
          rataRata: {
            categorie: data.rataRataKategori,
            score: data.rataRataScore,
          },
          predictedLabel: data.predictedLabel,
          rekomendasi: data.rekomendasi,
        },
        createdAt: data.createdAt,
      },
    };
  },
};
