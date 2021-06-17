import CreateTransactionService from '@services/transactions/createTransactionService';
import { Request, Response } from 'express';

async function newTransaction(
  request: Request,
  response: Response,
): Promise<Response> {
  const { client_id, client_name, total_to_pay, credit_card } = request.body;

  const createTransactionService = new CreateTransactionService();
  const transaction = await createTransactionService.execute({
    client_id,
    client_name,
    total_to_pay,
    credit_card,
  });

  return response.status(200).json(transaction);
}

// eslint-disable-next-line import/prefer-default-export
export { newTransaction };
