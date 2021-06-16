import AppHTTPError from '@errors/AppHTTPError';
import CreateUserService from './createUserService';

describe('Register User', () => {
  it('should be able to error on register with invalid email', async () => {
    const createUserService = new CreateUserService();

    const newUser = createUserService.execute({
      name: 'Tester',
      email: 'usertester.com',
      password: 'teste123',
    });

    await expect(newUser).rejects.toBeInstanceOf(AppHTTPError);
  });

  it('should be able to register new user', async () => {
    const createUserService = new CreateUserService();

    const newUser = await createUserService.execute({
      name: 'Tester',
      email: 'user@tester.com',
      password: 'teste123',
    });

    expect(newUser).toHaveProperty('id');
  });

  it('should be able to Error user exists', async () => {
    const createUserService = new CreateUserService();

    await createUserService.execute({
      name: 'Tester',
      email: 'user@tester.com',
      password: 'teste123',
    });

    await expect(
      createUserService.execute({
        name: 'Tester',
        email: 'user@tester.com',
        password: 'teste123',
      }),
    ).rejects.toBeInstanceOf(AppHTTPError);
  });
});
