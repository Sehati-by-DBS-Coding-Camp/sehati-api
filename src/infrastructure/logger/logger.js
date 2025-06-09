const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  level: 'error', // Catat log error dan level di atasnya
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }), // Tampilkan stack trace jika ada error
    format.json(),
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log error ke file
    new transports.Console(), // Log juga ke console (opsional)
  ],
});

module.exports = logger;
