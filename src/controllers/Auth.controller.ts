import AuthenticateService from '@services/sessions/authenticateService';
import { Request, Response } from 'express';

async function Authenticate(
  request: Request,
  response: Response,
): Promise<Response> {
  const { email, password } = request.body;
  const authenticaService = new AuthenticateService();

  const auth = await authenticaService.execute({ email, password });

  return response.status(200).json(auth);
}

// eslint-disable-next-line import/prefer-default-export
export { Authenticate };
