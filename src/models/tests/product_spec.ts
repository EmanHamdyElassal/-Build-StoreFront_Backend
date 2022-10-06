import { Product, ProductList } from '../product';
import pool from '../../database';

const Store = new ProductList();

describe('Model for product', () => {
  it(' index method', async () => {
    expect(Store.index).toBeDefined();
  });
  it('method for show', async () => {
    expect(Store.show).toBeDefined();
  });
  it('method for create', async () => {
    expect(Store.create).toBeDefined();
  });

  it('method for Delete', async () => {
    expect(Store.delete).toBeDefined();
  });
});

describe('method for Product', () => {
  /* const product = {
    name: 'product test',
    price: 111,
    category: 'category test',
  } as Product; */

  beforeAll(async () => {
    const result = await Store.create({
      productName: 'product',
      price: 100,
      id: 0,
      category: 'test product',
    });
  });
  afterAll(async () => {
    const connections = await pool.connect();
    await connections.query('DELETE FROM products');
    connections.release();
  });

  it('use index to return all products', async () => {
    const List = await Store.index();
    expect(List.length).toBeGreaterThan(0);
  });

  it('create to return a new product', async () => {
    const NewProduct = {
      productName: 'Newproduct',
      price: 1500,
      category: 'New',
    } as Product;
    const CreateNewProduct = await Store.create(NewProduct);
    expect(CreateNewProduct.id).toBeGreaterThan(0);
  });

  it('show method to return specificProduct', async () => {
    const showProduct = {
      productName: 'showSpecificProduct',
      price: 111,
      category: 'Specific Product',
    } as Product;
    const NewProduct = await Store.create(showProduct);
    const product = await Store.show(NewProduct.id.toString());
    expect(NewProduct.id).toEqual(product.id);
  });
});
