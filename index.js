const dotenv = require('dotenv');
const init = require('./src/infrastructure/http/hapi/server');

dotenv.config();

const start = async () => {
  try {
    const server = await init();
    await server.start();
    console.log('Server running on %s', server.info.uri);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
