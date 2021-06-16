import AppHTTPError from '@errors/AppHTTPError';
import User from '@models/User';
import { getRepository } from 'typeorm';
import * as yup from 'yup';

interface Request {
  name: string;
  email: string;
  password: string;
}

interface Response {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export default class CreateUserService {
  public async execute({ name, password, email }: Request): Promise<Response> {
    const userSchema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    });
    const userIsValid = await userSchema.isValid({ name, password, email });

    if (!userIsValid) {
      throw new AppHTTPError('values has invalid format', 400);
    }

    const userRepository = getRepository(User);

    const verifyUserExists = await userRepository.findOne({ where: { email } });

    if (verifyUserExists) {
      throw new AppHTTPError('user already exists');
    }

    const newUser = userRepository.create({ name, email, password });

    await userRepository.save(newUser);

    const userResponse = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      createdAt: newUser.created_at,
      updatedAt: newUser.updated_at,
    };

    return userResponse;
  }
}
