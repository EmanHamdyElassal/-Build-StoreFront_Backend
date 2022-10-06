// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { json } from 'body-parser';
import Client from '../database';

export type Product = {
  id: number;
  productName: string;
  price: number;
  category: string;
};

export class ProductList {
  async index(): Promise<Product[]> {
    try {
      const connect = await Client.connect();
      const productStore = await connect.query('SELECT * FROM products');
      connect.release();
      return productStore.rows;
    } catch (err) {
      throw new Error(`not get product. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const connect = await Client.connect();
      const productStore = await connect.query(
        'SELECT * FROM products WHERE id=($1)',
        [id]
      );
      connect.release();
      return productStore.rows[0];
    } catch (err) {
      throw new Error(`not find product ${id}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const connect = await Client.connect();
      const productStore = await connect.query(
        'INSERT INTO products (productName,price,category) VALUES ($1,$2,$3) RETURNING *',
        [p.productName, p.price, p.category]
      );
      const product = productStore.rows[0];
      connect.release();
      return product;
    } catch (err) {
      throw new Error(
        `not add a new product ${JSON.stringify(p)}. Error: ${err}`
      );
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const connect = await Client.connect();
      const productStore = await connect.query(
        'DELETE FROM products WHERE id=($1)',
        [id]
      );
      const product = productStore.rows[0];
      connect.release();
      return product;
    } catch (err) {
      throw new Error(`not delete product ${id}. Error: ${err}`);
    }
  }
}
