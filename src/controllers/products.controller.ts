import CreateProductService from '@services/products/createProductService';
import { Request, Response } from 'express';

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

// eslint-disable-next-line import/prefer-default-export
export { createProduct };
