import AppHTTPError from '@errors/AppHTTPError';
import Transaction from '@models/Transaction';
import { getRepository } from 'typeorm';
import * as yup from 'yup';

interface Request {
  client_id: string;
  client_name: string;
  total_to_pay: number;
  credit_card: {
    card_number: string;
    card_holder_name: string;
    value: number;
    cvv: number;
    exp_date: string;
  };
}

export default class CreateTransactionService {
  public async execute({
    client_id,
    client_name,
    total_to_pay,
    credit_card,
  }: Request): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction);
    const transaction = { client_id, client_name, total_to_pay, credit_card };

    const transactionShape = yup.object().shape({
      client_id: yup.string().required(),
      client_name: yup.string().required(),
      total_to_pay: yup.number().required(),
      credit_card: yup
        .object({
          card_number: yup.string().required(),
          card_holder_name: yup.string().required(),
          value: yup.number().required(),
          cvv: yup.number().required(),
          exp_date: yup.string().required(),
        })
        .required(),
    });

    const transactionIsValid = await transactionShape.isValid(transaction);

    if (!transactionIsValid) {
      throw new AppHTTPError('data fields with invalid format', 400);
    }
    const newTransaction = transactionRepository.create(transaction);
    await transactionRepository.save(newTransaction);
    return newTransaction;
  }
}
