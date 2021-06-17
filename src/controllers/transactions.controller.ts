import CreateTransactionService from '@services/transactions/createTransactionService';
import ListAllTransactionsService from '@services/transactions/listAllTransactionsService';
import ListTransactionsByIdService from '@services/transactions/listTransactionsByIdService';
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

async function historyAllTransactions(
  request: Request,
  response: Response,
): Promise<Response> {
  const listAllTransactionsService = new ListAllTransactionsService();
  const transations = await listAllTransactionsService.execute();
  return response.status(200).json(transations);
}

async function historyById(
  request: Request,
  response: Response,
): Promise<Response> {
  const { client_id } = request.params;
  const listTransactionsByIdService = new ListTransactionsByIdService();
  const transations = await listTransactionsByIdService.execute({ client_id });
  return response.status(200).json(transations);
}
// eslint-disable-next-line import/prefer-default-export
export { newTransaction, historyAllTransactions, historyById };
