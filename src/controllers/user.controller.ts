import CreateUserService from '@services/users/createUserService';
import { Request, Response } from 'express';

async function registerUser(
  request: Request,
  response: Response,
): Promise<Response> {
  const { name, email, password } = request.body;
  const createUserService = new CreateUserService();

  const newUser = await createUserService.execute({ name, email, password });

  return response.status(200).json(newUser);
}

// eslint-disable-next-line import/prefer-default-export
export { registerUser };
