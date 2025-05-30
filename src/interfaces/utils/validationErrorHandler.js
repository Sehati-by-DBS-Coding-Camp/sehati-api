function validationErrorHandler(request, h, err) {
  const errors = err.details.map((detail) => ({
    field: detail.path.join('.'),
    message: detail.message.replace(/"/g, ''),
  }));

  return h.response({
    statusCode: 400,
    error: 'Bad Request',
    message: 'Data validasi tidak sesuai',
    details: errors,
  }).code(400).takeover();
}

module.exports = validationErrorHandler;
