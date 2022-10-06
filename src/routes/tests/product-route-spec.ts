import request from 'supertest';
import app from '../../server';
import assert from 'assert';
import { UserStore, UserInfo } from '../../models/user';
import pool from '../../database';
import { Product } from '../../models/product';

describe('product routes', function () {
  const userStore = new UserStore();

  const testUser = {
    firstName: 'user1',
    lastName: 'user1',
    password: '123',
  } as UserInfo;

  let token: string | null = null;

  beforeAll(async () => {
    const createUser = await userStore.create(testUser);
    testUser.id = createUser.id;

    const response = await request(app)
      .post('/user/auth')
      .set('Accept', 'application/json')
      .send(testUser);
    token = response.body.data.token;
  });

  afterAll(async () => {
    const conn = await pool.connect();

    await conn.query('DELETE FROM products');
    await conn.query('DELETE FROM users');

    conn.release();
  });

  const testProduct = {
    productName: 'product test',
    price: 452,
    category: 'category test',
  } as Product;

  it('create product', async () => {
    const response = await request(app)
      .post('/product')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(testProduct)
      .expect(200);
    assert(response.body.name, testProduct.productName);
    testProduct.id = response.body.id;
  });

  it('index all products', async () => {
    const response = await request(app)
      .get('/product')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send()
      .expect(200);
    assert(response.body.length > 0);
  });

  it('show a product', async () => {
    const response = await request(app)
      .get(`/product/${testProduct.id}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(testProduct)
      .expect(200);
    assert(response.body.name, testProduct.productName);
  });
});
