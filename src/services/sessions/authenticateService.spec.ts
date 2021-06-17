import AppHTTPError from '@errors/AppHTTPError';
import User from '@models/User';
import { getRepository } from 'typeorm';
import AuthenticateService from './authenticateService';

describe('Authentication User', () => {
  it('should be able to Auth User', async () => {
    const authenticateService = new AuthenticateService();
    const userRepository = getRepository(User);

    const createUser = userRepository.create({
      name: 'tester',
      email: 'usertestauth@tester.com',
      password: 'teste123',
    });
    await userRepository.save(createUser);

    const auth = await authenticateService.execute({
      email: 'usertestauth@tester.com',
      password: 'teste123',
    });

    expect(auth).toHaveProperty('token');
  });
  it('should be able error password invalid', async () => {
    const authenticateService = new AuthenticateService();
    const userRepository = getRepository(User);

    const createUser = userRepository.create({
      name: 'tester',
      email: 'usertestnoauth@tester.com',
      password: 'teste123',
    });
    await userRepository.save(createUser);

    await expect(
      authenticateService.execute({
        email: 'usertestnoauth@tester.com',
        password: 'teste1234',
      }),
    ).rejects.toBeInstanceOf(AppHTTPError);
  });
});
