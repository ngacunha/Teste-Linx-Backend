import CreateProductService from '@services/products/createProductService';
import ListProductsService from '@services/products/listProductsService';
import { Request, Response } from 'express';
import Cache from '../cache/redisSetup';

async function createProduct(
  request: Request,
  response: Response,
): Promise<Response> {
  const { title, price, zipcode, seller, thumbnailHd, date } = request.body;
  const createProductService = new CreateProductService();
  const newProduct = await createProductService.execute({
    title,
    price,
    zipcode,
    seller,
    thumbnailHd,
    date,
  });
  return response.status(200).json(newProduct);
}

async function listProducts(
  request: Request,
  response: Response,
): Promise<Response> {
  const cached = await Cache.get('products');

  if (cached) {
    return response.status(200).json(cached);
  }

  const listProductsService = new ListProductsService();
  const products = await listProductsService.execute();
  Cache.set('products', products, 30);

  return response.status(200).json(products);
}
// eslint-disable-next-line import/prefer-default-export
export { createProduct, listProducts };
