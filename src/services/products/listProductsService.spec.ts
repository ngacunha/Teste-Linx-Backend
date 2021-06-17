import Product from '@models/Product';
import { getRepository } from 'typeorm';
import ListProductsService from './listProductsService';

describe('List Products', () => {
  it('should be able to List Products', async () => {
    const listProductsService = new ListProductsService();

    const productsRepository = getRepository(Product);

    const productOne = productsRepository.create({
      title: 'Blusa de Testes 11111',
      price: 7990,
      zipcode: '78993-010',
      seller: 'João da Silva',
      thumbnailHd:
        'https://cdn.awsli.com.br/600x450/21/21351/produto/3853007/f66e8c63ab.jpg',
      date: '26/11/2015',
    });

    const productTwo = productsRepository.create({
      title: 'Blusa de Testes 22222',
      price: 5874,
      zipcode: '78993-010',
      seller: 'João da Silva',
      thumbnailHd:
        'https://cdn.awsli.com.br/600x450/21/21351/produto/3853007/f66e8c63ab.jpg',
      date: '26/11/2015',
    });

    await productsRepository.save(productOne);
    await productsRepository.save(productTwo);

    const list = await listProductsService.execute();

    expect(list).not.toHaveLength(0);
  });
});
