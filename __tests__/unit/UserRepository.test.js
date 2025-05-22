const userRepository = require('../../src/domain/repository/UserRepository');

const pool = require('../../src/infrastructure/db/mysql/connection');
const { getUsers } = require('../repositories/userRepository');

// Mock pool.query
// jest.mock('../config/connection', () => ({
//   query: jest.fn(),
// }));

describe('userRepository', () => {
  it('should return users from database', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    ];

    pool.query.mockResolvedValue([mockUsers]);

    const result = await userRepository();

    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM users');
    expect(result).toEqual(mockUsers);
  });
});
