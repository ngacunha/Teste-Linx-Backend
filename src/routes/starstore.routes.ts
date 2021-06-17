import { createProduct, listProducts } from '@controllers/products.controller';
import { newTransaction } from '@controllers/transactions.controller';
import { Router } from 'express';

const storeRoutes = Router();

storeRoutes.post('/product', createProduct);
storeRoutes.get('/products', listProducts);
storeRoutes.post('/buy', newTransaction);

export default storeRoutes;
