import AppHTTPError from '@errors/AppHTTPError';
import { NextFunction, Request, Response } from 'express';

export default function errorHandling(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (err instanceof AppHTTPError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }
  // eslint-disable-next-line no-console
  console.log(err);
  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
}
