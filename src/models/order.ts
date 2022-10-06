import Client from '../database';

export type Order = {
  id: number;
  user_id: string;
  Orderstatus: string;
};

export class OrderfromStore {
  static create(orderstorefront: Order) {
    throw new Error('Method not implemented.');
  }

  async show(id: string): Promise<Order> {
    try {
      const connection = await Client.connect();
      const order = await connection.query(
        'SELECT * FROM orders WHERE id=($1)',
        [id]
      );
      connection.release();
      return order.rows[0];
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async index(user_id: number): Promise<Order[]> {
    try {
      const connection = await Client.connect();
      const order = await connection.query(
        'SELECT * FROM orders WHERE user_id=($1)',
        [user_id]
      );
      connection.release();
      return order.rows;
    } catch (err) {
      throw new Error(`not get orders. Error: ${err}`);
    }
  }

  async create(ord: Order): Promise<Order> {
    try {
      const connection = await Client.connect();
      const order = await connection.query(
        'INSERT INTO orders ( Orderstatus, user_id) VALUES($1, $2) RETURNING *'
      );
      const orders = order.rows[0];
      connection.release();
      return orders;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderID: number,
    productID: number
  ): Promise<boolean> {
    try {
      const connection = await Client.connect();
      const order = await connection.query(
        'INSERT INTO order_products ( quantity, order_id, product_id ) VALUES($1, $2, $3) RETURNING *',
        [quantity, orderID, productID]
      );
      connection.release();
      return true;
    } catch (err) {
      throw new Error(`not add new order ${productID}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const connection = await Client.connect();
      const order = await connection.query('DELETE FROM orders WHERE id=($1)', [
        id,
      ]);
      const orders = order.rows[0];
      connection.release();
      return orders;
    } catch (err) {
      throw new Error(`not delete order ${id}. Error: ${err}`);
    }
  }
}
