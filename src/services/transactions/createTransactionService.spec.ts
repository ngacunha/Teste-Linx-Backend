import AppHTTPError from '@errors/AppHTTPError';
import Transaction from '@models/Transaction';
import CreateTransactionService from './createTransactionService';

describe('new Transaction', () => {
  it('should be able to new Transaction', async () => {
    const createTransactionService = new CreateTransactionService();
    const newTransaction = await createTransactionService.execute({
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

    expect(newTransaction).toHaveProperty('purchase_id');
  });

  it('should be able to new Transaction with invalid fields', async () => {
    const createTransactionService = new CreateTransactionService();
    const transaction = {
      client_id: '7e655c6e-e8e5-4349-8348-e51e0ff3072e',
      client_name: 'Luke Skywalker',
      total_to_pay: '1236a',
      credit_card: {
        card_number: '1234123412341234',
        value: 7990,
        cvv: 789,
        card_holder_name: 'Luke Skywalker',
        exp_date: '12/24',
      },
    } as unknown as Transaction;

    await expect(
      createTransactionService.execute(transaction),
    ).rejects.toBeInstanceOf(AppHTTPError);
  });
});
