import Product from '@models/Product';
import { getRepository } from 'typeorm';
import * as yup from 'yup';
import AppHTTPError from '@errors/AppHTTPError';

interface Request {
  title: string;
  price: number;
  zipcode: string;
  seller: string;
  thumbnailHd: string;
  date: string;
}

export default class CreateProductService {
  public async execute({
    title,
    price,
    zipcode,
    seller,
    thumbnailHd,
    date,
  }: Request): Promise<Product> {
    const productsRepository = getRepository(Product);
    const product = {
      title,
      price,
      zipcode,
      seller,
      thumbnailHd,
      date,
    };
    const productSchema = yup.object().shape({
      title: yup.string().required(),
      price: yup.number().required(),
      zipcode: yup
        .string()
        .required()
        .min(9)
        .max(9)
        .matches(/^\d{5}([-])\d{3}$/),
      seller: yup.string().required(),
      thumbnailHd: yup.string().required(),
      date: yup
        .string()
        .required()
        .matches(/^\d{2}([/])\d{2}\1\d{4}$/),
    });

    const productIsValid = await productSchema.isValid(product);

    if (!productIsValid) {
      throw new AppHTTPError('data fields with invalid format', 400);
    }

    const newProduct = productsRepository.create(product);
    await productsRepository.save(newProduct);

    return newProduct;
  }
}
