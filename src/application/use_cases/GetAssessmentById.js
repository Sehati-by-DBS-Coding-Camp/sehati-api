class getAssessmentById {
  constructor(assessmentRepository, calculateDASS21Score) {
    this.assessmentRepository = assessmentRepository;
    this.calculateDASS21Score = calculateDASS21Score;
  }

  async execute(id) {
    const assessmentListData = await this.assessmentRepository.getById(id);
    if (!assessmentListData) {
      const error = new Error('Id not found');
      error.code = 'ID_NOT_FOUND';
      throw error;
    }

    const resulrCalculateDASS21Score = this.calculateDASS21Score(assessmentListData);
    const result = {
      id: assessmentListData.dassId,
      userId: assessmentListData.userId,
      depresiKategori: resulrCalculateDASS21Score.depresi.severity,
      depresiScore: resulrCalculateDASS21Score.depresi.score,
      kecemasanKategori: resulrCalculateDASS21Score.kecemasan.severity,
      kecemasanScore: resulrCalculateDASS21Score.kecemasan.score,
      stresKategori: resulrCalculateDASS21Score.stres.severity,
      stresScore: resulrCalculateDASS21Score.stres.score,
      rataRataKategori: resulrCalculateDASS21Score.rataRata.severity,
      rataRataScore: resulrCalculateDASS21Score.rataRata.score,
      predictedLabel: assessmentListData.predicted_label,
      rekomendasi: assessmentListData.rekomendasi,
      createdAt: assessmentListData.createdAt,
    };

    return result;
  }
}

module.exports = getAssessmentById;
