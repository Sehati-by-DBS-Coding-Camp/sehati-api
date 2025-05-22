const WelcomeSerializer = require('../serializers/WelcomeSerializer');

module.exports = {
  async sayHelloWorld(request, h) {
    return h.response(WelcomeSerializer.serialize()).code(200);
  },
};
