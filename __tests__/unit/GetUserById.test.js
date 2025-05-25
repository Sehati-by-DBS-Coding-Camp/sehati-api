const GetUserById = require('../../src/application/use_cases/GetUserById');

describe('GetUserById', () => {
  let userRepository;
  let getUserById;

  beforeEach(() => {
    userRepository = {
      findById: jest.fn(),
    };
    getUserById = new GetUserById(userRepository);
  });

  it('should throw error if userId is not provided', async () => {
    await expect(getUserById.execute()).rejects.toThrow('User ID is required');
  });

  it('should throw error if user not found', async () => {
    userRepository.findById.mockResolvedValue(null);
    await expect(getUserById.execute('123')).rejects.toThrow('User not found');
  });

  it('should return user if found', async () => {
    const user = { id: '123', name: 'Test' };
    userRepository.findById.mockResolvedValue(user);
    await expect(getUserById.execute('123')).resolves.toEqual(user);
  });

  it('should throw error if repository throws error', async () => {
    userRepository.findById.mockRejectedValue(new Error('DB error'));
    await expect(getUserById.execute('123')).rejects.toThrow('DB error');
  });

  it('should throw error if userId is an empty string', async () => {
    await expect(getUserById.execute('')).rejects.toThrow('User ID is required');
  });
});