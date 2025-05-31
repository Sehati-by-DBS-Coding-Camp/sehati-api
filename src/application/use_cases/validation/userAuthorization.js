const Boom = require('@hapi/boom');

const userAuthorization = (request, h) => {
  const { userId } = request.params;
  if (!userId) {
    return Boom.badRequest('User ID params is required');
  }

  const userIdFromToken = request.auth.credentials.userId;

  if (userId !== userIdFromToken) {
    return Boom.forbidden('You are not allowed to access this resource');
  }

  return h.continue; // Allow the request to proceed if authorization is successful
};

module.exports = userAuthorization;
