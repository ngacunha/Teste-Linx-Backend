import { createProduct } from '@controllers/products.controller';
import { Router } from 'express';

const storeRoutes = Router();

storeRoutes.post('/product', createProduct);

export default storeRoutes;
