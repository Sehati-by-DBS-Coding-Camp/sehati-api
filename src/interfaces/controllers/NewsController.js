const axios = require('axios');
const Boom = require('@hapi/boom');

class NewsController {
  static async news(request, h) {
    try {
      const url = `https://newsapi.org/v2/everything?q=mental+health&apiKey=${process.env.NEWSAPI_KEY}`;
      const response = await axios.get(url);
      // console.log(response.data);
      // return h.response(response.data).code(200);
      return h.response({
        statusCode: 200,
        error: false,
        message: 'success',
        data: response.data.articles,
      }).code(200);
    } catch (err) {
      return Boom.badImplementation(err.message);
    }
  }
}

module.exports = NewsController;
