import { createProduct, listProducts } from '@controllers/products.controller';
import {
  historyAllTransactions,
  historyById,
  newTransaction,
} from '@controllers/transactions.controller';
import { Router } from 'express';

const storeRoutes = Router();

storeRoutes.post('/product', createProduct);
storeRoutes.get('/products', listProducts);
storeRoutes.post('/buy', newTransaction);
storeRoutes.get('/history', historyAllTransactions);
storeRoutes.get('/history/:client_id', historyById);

export default storeRoutes;
