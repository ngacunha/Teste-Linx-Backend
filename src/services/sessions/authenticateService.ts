import User from '@models/User';
import { getRepository } from 'typeorm';
import AppHTTPError from '@errors/AppHTTPError';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import jwtConfig from '@config/auth';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}
export default class AuthenticateService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppHTTPError('email and/or password invalid', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new AppHTTPError('email and/or password invalid', 401);
    }

    const token = jwt.sign({ id: user.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    delete user.password;

    return {
      user,
      token,
    };
  }
}
