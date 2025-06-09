const Boom = require('@hapi/boom');
const { nanoid } = require('nanoid');

const assessmentSerializer = require('../serializers/assessmentSerializer');
const getAssessmentByIdSerializer = require('../serializers/getAssessmentByIdSerializer');

class AssessmentController {
  constructor({
    newAssessment, getAssessmentById, getAssessmentByUserId, getAllAssessment,
    deleteAssessmentById, GetNews,
  }) {
    this.newAssessment = newAssessment;
    this.getAllAssessment = getAllAssessment;
    this.getAssessmentById = getAssessmentById;
    this.getAssessmentByUserId = getAssessmentByUserId;
    this.deleteAssessmentById = deleteAssessmentById;
    this.GetNews = GetNews;
  }

  static getHighestScoreType({ depresiScore, kecemasanScore, stresScore }) {
    const maxScore = Math.max(depresiScore, kecemasanScore, stresScore);
    if (maxScore === depresiScore) return 'mental+health+depression';
    if (maxScore === kecemasanScore) return 'mental+health+anxiety';
    return 'mental+health+stress';
  }

  async create(request, h) {
    try {
      const id = nanoid(10);
      const userIdFromToken = request.auth.credentials.userId;

      const payload = { ...request.payload, id, userId: userIdFromToken };

      const result = await this.newAssessment.execute(payload);

      const { depresiScore, kecemasanScore, stresScore } = result;
      const highestType = AssessmentController
        .getHighestScoreType({ depresiScore, kecemasanScore, stresScore });

      const news = await this.GetNews.execute(`mental+health+${result.predictedLabel}` || highestType);

      return h.response(assessmentSerializer.serialize({
        data: result, news, code: 201,
      })).code(201);
    } catch (err) {
      return Boom.badImplementation(err.message);
    }
  }

  async getById(request, h) {
    try {
      const { assessmentId } = request.params;
      const assessment = await this.getAssessmentById.execute(assessmentId);

      return h.response(getAssessmentByIdSerializer.serialize({
        data: assessment, code: 200,
      })).code(200);
    } catch (err) {
      if (err.code === 'ASSESSMENT_NOT_FOUND') {
        return Boom.notFound('Assessment not found');
      }
      return Boom.badImplementation(err.message);
    }
  }

  async delete(request, h) {
    try {
      const { assessmentId } = request.params;

      await this.deleteAssessmentById.execute(assessmentId);

      return h.response({ message: 'Assessment deleted successfully' }).code(204);
    } catch (err) {
      if (err.code === 'ASSESSMENT_NOT_FOUND') {
        return Boom.notFound('Assessment not found');
      }
      return Boom.badImplementation(err.message);
    }
  }

  async getByUserId(request, h) {
    try {
      const { userId } = request.params;
      const assessmentsListData = await this.getAssessmentByUserId.execute(userId);

      const serializedData = assessmentsListData.map((data) => ({
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
        },
        createdAt: data.createdAt,
      }));

      return h.response({
        statusCode: 200,
        error: false,
        message: 'success',
        data: serializedData,
      }).code(200);
    } catch (err) {
      if (err.code === 'ASSESSMENT_NOT_FOUND') {
        return Boom.notFound('No assessments found for this user');
      }
      return Boom.badImplementation(err.message);
    }
  }

  async getAll(request, h) {
    try {
      const assessments = await this.getAllAssessment.execute();

      return h.response(assessments).code(200);
    } catch (err) {
      return Boom.badImplementation(err.message);
    }
  }
}

module.exports = AssessmentController;
