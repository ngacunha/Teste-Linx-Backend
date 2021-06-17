import AppHTTPError from '@errors/AppHTTPError';
import Product from '@models/Product';
import CreateProductService from './createProductService';

describe('Create Product', () => {
  it('should be able to Create Product', async () => {
    const createProductService = new CreateProductService();
    const product = {
      title: 'Blusa de Testes',
      price: 7990,
      zipcode: '78993-010',
      seller: 'João da Silva',
      thumbnailHd:
        'https://cdn.awsli.com.br/600x450/21/21351/produto/3853007/f66e8c63ab.jpg',
      date: '26/11/2015',
    };
    const newProduct = await createProductService.execute(product);

    expect(newProduct).toHaveProperty('id');
  });

  it('should be able to Create Product without field', async () => {
    const createProductService = new CreateProductService();
    const product = {
      title: 'Blusa de Testes',
      thumbnailHd:
        'https://cdn.awsli.com.br/600x450/21/21351/produto/3853007/f66e8c63ab.jpg',
      date: '26/11/2015',
    } as Product;

    await expect(createProductService.execute(product)).rejects.toBeInstanceOf(
      AppHTTPError,
    );
  });

  it('should be able to Create Product invalid zipcode', async () => {
    const createProductService = new CreateProductService();
    const product = {
      title: 'Blusa de Testes',
      price: 7990,
      zipcode: '78993010',
      seller: 'João da Silva',
      thumbnailHd:
        'https://cdn.awsli.com.br/600x450/21/21351/produto/3853007/f66e8c63ab.jpg',
      date: '26/11/2015',
    };

    await expect(createProductService.execute(product)).rejects.toBeInstanceOf(
      AppHTTPError,
    );
  });

  it('should be able to Create Product invalid date', async () => {
    const createProductService = new CreateProductService();

    const product = {
      title: 'Blusa de Testes',
      price: 7990,
      zipcode: '78993-010',
      seller: 'João da Silva',
      thumbnailHd:
        'https://cdn.awsli.com.br/600x450/21/21351/produto/3853007/f66e8c63ab.jpg',
      date: '26/112/015',
    };

    await expect(createProductService.execute(product)).rejects.toBeInstanceOf(
      AppHTTPError,
    );
  });
});
