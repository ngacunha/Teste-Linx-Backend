import Transaction from '@models/Transaction';
import { getRepository } from 'typeorm';

interface Response {
  client_id: string;
  purchase_id: string;
  value: number;
  date: string;
  card_number: string;
}
export default class ListAllTransactionsService {
  public async execute(): Promise<Response[]> {
    const transactionRepository = getRepository(Transaction);

    const listTransactions = await transactionRepository.find({
      relations: ['credit_card'],
    });

    const replaceList = listTransactions.map(transaction => {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      } as unknown;

      const formatDate = new Date(transaction.created_at);
      const date = formatDate.toLocaleDateString('pt-BR', options);
      const lastNumbersCard = transaction.credit_card.card_number.slice(-4);
      const card_number = `**** **** **** ${lastNumbersCard}`;

      return {
        client_id: transaction.client_id,
        purchase_id: transaction.purchase_id,
        value: transaction.credit_card.value,
        date,
        card_number,
      };
    });
    return replaceList;
  }
}
