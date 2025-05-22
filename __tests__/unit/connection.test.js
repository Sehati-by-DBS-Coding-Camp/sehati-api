const pool = require('../../src/infrastructure/db/mysql/connection');

describe('Database Connection', () => {
  test('should connect to the database', async () => {
    const connection = await pool.getConnection();
    expect(connection).toBeDefined();
    connection.release();
  });
});