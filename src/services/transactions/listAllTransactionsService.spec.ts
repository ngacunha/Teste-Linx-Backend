import Transaction from '@models/Transaction';
import { getRepository } from 'typeorm';
import ListAllTransactionsService from './listAllTransactionsService';

describe('List Transaction', () => {
  it('should be able to List Transaction', async () => {
    const transactionRepository = getRepository(Transaction);
    const listAllTransactionsService = new ListAllTransactionsService();
    const transactionOne = transactionRepository.create({
      client_id: '7e655c6e-e8e5-4349-8348-e51e0ff3072e',
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

    await transactionRepository.save(transactionOne);

    const list = await listAllTransactionsService.execute();

    expect(list).not.toHaveLength(0);
  });
});
