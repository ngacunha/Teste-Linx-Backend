import Transaction from '@models/Transaction';
import { getRepository } from 'typeorm';
import ListTransactionsByIdService from './listTransactionsByIdService';

describe('List Transaction', () => {
  it('should be able to List Transaction', async () => {
    const transactionRepository = getRepository(Transaction);
    const listTransactionsByIdService = new ListTransactionsByIdService();

    const transactionOne = transactionRepository.create({
      client_id: 'cliente-teste-id-1',
      client_name: 'Luke Skywalker',
      total_to_pay: 1236,
      credit_card: {
        card_number: '1234123412341234',
        value: 7990,
        cvv: 789,
        card_holder_name: 'Luke Skywalker',
        exp_date: '12/24',
      },
    });

    const transactionTwo = transactionRepository.create({
      client_id: 'cliente-teste-id-1',
      client_name: 'Luke Skywalkera',
      total_to_pay: 1236,
      credit_card: {
        card_number: '1234123412341234',
        value: 7990,
        cvv: 789,
        card_holder_name: 'Luke Skywalker',
        exp_date: '12/24',
      },
    });

    await transactionRepository.save(transactionOne);
    await transactionRepository.save(transactionTwo);

    const list = await listTransactionsByIdService.execute({
      client_id: 'cliente-teste-id-1',
    });

    expect(list).toHaveLength(2);
  });
});
