import request from 'supertest';
import app from '../../server';
import assert from 'assert';
import { UserStore, UserInfo } from '../../models/user';
import { Order } from '../../models/order';
import pool from '../../database';
import { Product, ProductList } from '../../models/product';

describe('Order routes', function () {
  const userStore = new UserStore();
  const productStore = new ProductList();

  const testUser = {
    firstName: 'user1',
    lastName: 'user1',
    password: '123',
  } as UserInfo;

  const testProduct = {
    productName: 'product test',
    price: 452,
    category: 'category test',
  } as Product;

  let token: string | null = null;

  const testOrder = {
    Orderstatus: 'active',
    user_id: '-1',
  } as Order;

  beforeAll(async () => {
    const createUser = await userStore.create(testUser);
    testUser.id = createUser.id;
    testOrder.user_id = createUser.id.toString();

    const response = await request(app)
      .post('/user/auth')
      .set('Accept', 'application/json')
      .send(testUser);
    token = response.body.data.token;

    const createProduct = await productStore.create(testProduct);
    testProduct.id = createProduct.id;
  });

  afterAll(async () => {
    const conn = await pool.connect();
    await conn.query('DELETE FROM order_products');
    await conn.query('DELETE FROM orders');
    await conn.query('DELETE FROM products');
    await conn.query('DELETE FROM users');
    conn.release();
  });

  it('create an order', async () => {
    const response = await request(app)
      .post('/order')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(testOrder)
      .expect(200);
    assert(response.body.status, testOrder.Orderstatus);
    testOrder.id = response.body.id;
  });

  it('index all orders', async () => {
    const response = await request(app)
      .get('/order')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send()
      .expect(200);
    assert(response.body.length > 0);
  });

  it('add a new product', async () => {
    const response = await request(app)
      .post(`/order/${testOrder.id}/product`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send({ quantity: 21, productId: testProduct.id })
      .expect(200);
    assert(response.body, 'true');
  });
});
