import AppHTTPError from '@errors/AppHTTPError';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import jwtConfig from '@config/auth';

interface TokenPayLoad {
  id: string;
  iat: number;
  exp: number;
}

export default function AuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppHTTPError('not authorization', 401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, jwtConfig.secret);

    const { id } = data as TokenPayLoad;

    request.userID = id;

    return next();
  } catch {
    throw new AppHTTPError('not authorization', 401);
  }
}
