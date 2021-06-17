import Product from '@models/Product';
import { getRepository } from 'typeorm';

interface Response {
  title: string;
  price: number;
  zipcode: string;
  seller: string;
  thumbnailHd: string;
  date: string;
}

export default class ListProductsService {
  public async execute(): Promise<Response[]> {
    const productRepository = getRepository(Product);

    const findProducts = await productRepository.find();

    const listProducts = findProducts.map(
      ({ title, price, zipcode, seller, thumbnailHd, date }) => {
        return { title, price, zipcode, seller, thumbnailHd, date };
      },
    );
    return listProducts;
  }
}
