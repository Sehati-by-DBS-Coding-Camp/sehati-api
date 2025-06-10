const axios = require('axios');
const { Logger } = require('winston');

class GetNews {
  static async execute(data) {
    try {
      let url = `https://newsapi.org/v2/everything?q=${data}&language=en&pageSize=5&apiKey=${process.env.NEWSAPI_KEY}`;
      let response = await axios.get(url);

      if (!response.data.articles || response.data.articles.length === 0) {
        url = `https://newsapi.org/v2/everything?q=mental+health&language=en&pageSize=5&apiKey=${process.env.NEWSAPI_KEY}`;
        response = await axios.get(url);
      }

      if (response.status !== 200) {
        throw new Error('Failed to fetch news');
      }

      return response.data.articles;
    } catch (err) {
      Logger.error('Error fetching news:', err.message);
      throw new Error(err.message);
    }
  }
}

module.exports = GetNews;
