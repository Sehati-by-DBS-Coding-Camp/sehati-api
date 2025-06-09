class getAssessmentByUserId {
  constructor(assessmentRepository, calculateDASS21Score) {
    this.assessmentRepository = assessmentRepository;
    this.calculateDASS21Score = calculateDASS21Score;
  }

  async execute(userId) {
    const assessmentListData = await this.assessmentRepository.getByUserId(userId);
    if (!assessmentListData) {
      const error = new Error('User not found');
      error.code = 'USER_NOT_FOUND';
      throw error;
    }

    const resulrCalculateDASS21Score = assessmentListData.map(
      (listData) => this.calculateDASS21Score(listData),
    );
    const result = resulrCalculateDASS21Score.map((data, index) => ({
      id: assessmentListData[index].dassId,
      userId: assessmentListData[index].userId,
      depresiKategori: data.depresi.severity,
      depresiScore: data.depresi.score,
      kecemasanKategori: data.kecemasan.severity,
      kecemasanScore: data.kecemasan.score,
      stresKategori: data.stres.severity,
      stresScore: data.stres.score,
      rataRataKategori: data.rataRata.severity,
      rataRataScore: data.rataRata.score,
      predictedLabel: assessmentListData[index].predicted_label,
      createdAt: assessmentListData[index].createdAt,
    }));

    return result;
  }
}

module.exports = getAssessmentByUserId;
