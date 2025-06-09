const axios = require('axios');

const BASE_URL = 'http://35.219.5.8:8000';

/**
 * Menghitung skor DASS-21 berdasarkan jawaban pengguna.
 *
 * @param {object} answers - Objek yang berisi jawaban untuk 21 pertanyaan DASS-21.
 * Setiap kunci adalah nomor pertanyaan (1-21) dan nilai adalah skor (0-3).
 * Contoh: { d1: 0, d2: 1, d3: 2, ... , s7: 3 }
 * @returns {object} - Objek yang berisi skor dan interpretasi untuk Depresi, Kecemasan, dan Stres.
 * Contoh: {
 * depresi: { score: 18, severity: "Sedang" },
 * kecemasan: { score: 10, severity: "Sedang" },
 * stres: { score: 20, severity: "Sedang" }
 * }
 */
function calculateDASS21Score(answers) {
  const {
    d1, d2, d3, d4, d5, d6, d7,
    a1, a2, a3, a4, a5, a6, a7,
    s1, s2, s3, s4, s5, s6, s7,
  } = answers;

  // Kelompok pertanyaan berdasarkan subskala
  const depressionQuestions = [d1, d2, d3, d4, d5, d6, d7];
  const anxietyQuestions = [a1, a2, a3, a4, a5, a6, a7];
  const stressQuestions = [s1, s2, s3, s4, s5, s6, s7];

  // Fungsi helper untuk menghitung skor mentah
  // Sekarang, 'scoreValue' langsung adalah nilai skor (0-3)
  const sumScores = (scoresArray) => scoresArray.reduce((total, scoreValue) => {
    // Pastikan nilai adalah angka dan dalam rentang 0-3. Jika tidak, anggap 0.
    const validScore = typeof scoreValue === 'number' && scoreValue >= 0 && scoreValue <= 3 ? scoreValue : 0;
    return total + validScore;
  }, 0);

  // Hitung skor mentah
  const rawDepressionScore = sumScores(depressionQuestions);
  const rawAnxietyScore = sumScores(anxietyQuestions);
  const rawStressScore = sumScores(stressQuestions);

  // Kalikan skor mentah dengan 2
  const finalDepressionScore = rawDepressionScore * 2;
  const finalAnxietyScore = rawAnxietyScore * 2;
  const finalStressScore = rawStressScore * 2;

  // Fungsi helper untuk menentukan tingkat keparahan
  const getSeverity = (score, type) => {
    if (type === 'depresi') {
      if (score >= 28) return 'Sangat Berat';
      if (score >= 21) return 'Berat';
      if (score >= 14) return 'Sedang';
      if (score >= 10) return 'Ringan';
      return 'Normal';
    } if (type === 'kecemasan') {
      if (score >= 20) return 'Sangat Berat';
      if (score >= 15) return 'Berat';
      if (score >= 10) return 'Sedang';
      if (score >= 8) return 'Ringan';
      return 'Normal';
    } if (type === 'stres') {
      if (score >= 34) return 'Sangat Berat';
      if (score >= 26) return 'Berat';
      if (score >= 19) return 'Sedang';
      if (score >= 15) return 'Ringan';
      return 'Normal';
    }
    return 'Tidak Diketahui'; // Seharusnya tidak tercapai
  };

  return {
    depresi: {
      score: finalDepressionScore,
      severity: getSeverity(finalDepressionScore, 'depresi'),
    },
    kecemasan: {
      score: finalAnxietyScore,
      severity: getSeverity(finalAnxietyScore, 'kecemasan'),
    },
    stres: {
      score: finalStressScore,
      severity: getSeverity(finalStressScore, 'stres'),
    },
  };
}

/**
 * Mengirim teks keluhan tambahan ke API prediksi dan mendapatkan label prediksi.
 *
 * @param {string} keluhanTambahan - Teks keluhan tambahan yang akan diprediksi.
 * @returns {Promise<string|null>} - Mengembalikan label prediksi jika berhasil,
 * atau null jika terjadi kesalahan.
 */
const getPredictedLabel = async (keluhanTambahan) => {
  const url = `${BASE_URL}/predict`;
  const data = {
    text: keluhanTambahan,
  };

  try {
    const response = await axios.post(url, data);
    // Memastikan respons memiliki struktur yang diharapkan
    if (response.data && response.data.predicted_label) {
      return response.data.predicted_label;
    }
    console.warn('Respons API tidak memiliki predicted_label yang diharapkan:', response.data);
    return null;
  } catch (error) {
    console.error('Terjadi kesalahan saat melakukan prediksi:', error);
    // Anda bisa menambahkan penanganan kesalahan yang lebih spesifik di sini,
    // misalnya melempar error kembali atau mengembalikan pesan error.
    return null;
  }
};

const getRekomendation = async ({
  depresi, kecemasan, stres, predictedLabel,
}) => {
  const url = `${BASE_URL}/rekomendasi`;
  const data = {
    depresi,
    kecemasan,
    stress: stres,
    label_ml: predictedLabel,
  };

  try {
    const response = await axios.post(url, data);
    // Memastikan respons memiliki struktur yang diharapkan
    if (response.data && response.data.rekomendasi) {
      return response.data.rekomendasi;
    }
    console.warn('Respons API tidak memiliki rekomendasi yang diharapkan:', response.data);
    return null;
  } catch (error) {
    console.error('Terjadi kesalahan saat melakukan pengambilan rekomendasi:', error);
    // Anda bisa menambahkan penanganan kesalahan yang lebih spesifik di sini,
    // misalnya melempar error kembali atau mengembalikan pesan error.
    return null;
  }
};

module.exports = { calculateDASS21Score, getPredictedLabel, getRekomendation };
