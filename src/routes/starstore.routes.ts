import { createProduct, listProducts } from '@controllers/products.controller';
import { Router } from 'express';

const storeRoutes = Router();

storeRoutes.post('/product', createProduct);
storeRoutes.get('/products', listProducts);

export default storeRoutes;
