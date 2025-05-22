const CreateUser = require('../../src/application/use_cases/CreateUser');

test('create user', async () => {
  const user = await CreateUser.execute('Ary Kurnia', '9oE4u@example.com', 'password');
  
  expect(user.name).toBe('Ary Kurnia');
  expect(user.email).toBe('9oE4u@example.com');
  expect(user.password).toBe('password');

  console.log(user);
});
