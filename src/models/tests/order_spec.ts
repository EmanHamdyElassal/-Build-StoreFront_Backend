import pool from '../../database';
import { UserInfo, UserStore } from '../user';
import { Product, ProductList } from '../product';
import { Order, OrderfromStore } from '../order';

const userStore = new UserStore();
const productList = new ProductList();
const orderfromStore = new OrderfromStore();

describe('Order models', () => {
  it('method for index', async () => {
    expect(orderfromStore.index).toBeDefined();
  });

  it('method for addProduct', async () => {
    expect(orderfromStore.addProduct).toBeDefined();
  });

  it('method for create', async () => {
    expect(orderfromStore.create).toBeDefined();
  });

  it('method for show', async () => {
    expect(orderfromStore.show).toBeDefined();
  });
});

describe('Create Order method', () => {
  const orderstorefront = {
    Orderstatus: 'complete',
    user_id: '-1',
  } as Order;

  const userstorefront = {
    firstName: 'user store',
    lastName: 'user store',
    password: '1510',
  } as UserInfo;

  const productstorefront = {
    productName: 'product test',
    category: 'category test',
    price: 1543,
  } as Product;

  beforeAll(async () => {
    const makeUser = await userStore.create(userstorefront);
    userstorefront.id = makeUser.id;
    orderstorefront.user_id = makeUser.id.toString();

    const makeOrder = await orderfromStore.create(orderstorefront);
    orderstorefront.id = makeOrder.id;

    const makeProduct = await productList.create(productstorefront);
    productstorefront.id = makeProduct.id;
  });

  afterAll(async () => {
    const connectDatabase = await pool.connect();
    await connectDatabase.query('DELETE FROM users');
    await connectDatabase.query('DELETE FROM order_products');
    await connectDatabase.query('DELETE FROM orders');
    await connectDatabase.query('DELETE FROM products');
    connectDatabase.release();
  });

  it('index all orders', async () => {
    const ordersListIndex = await orderfromStore.index(userstorefront.id);
    expect(ordersListIndex.length).toBeGreaterThan(0);
  });

  it('ADD new order', async () => {
    const testOrder = {
      Orderstatus: 'active',
      user_id: userstorefront.id.toString(),
    } as unknown as Order;

    const createOrder = await orderfromStore.create(testOrder);
    expect(createOrder.id).toBeGreaterThan(0);
  });

  it('show specific order', async () => {
    const testOrder = {
      status: 'active',
      userId: userstorefront.id.toString(),
    } as unknown as Order;

    const createOrder = await orderfromStore.create(testOrder);
    const order = await orderfromStore.show(createOrder.id.toString());
    expect(createOrder.id).toEqual(order.id);
  });

  it('addProduct to order', async () => {
    const testOrder = {
      status: 'active',
      userId: userstorefront.id.toString(),
    } as unknown as Order;

    const createOrder = await orderfromStore.create(testOrder);
    const result = await orderfromStore.addProduct(
      3,
      createOrder.id,
      productstorefront.id
    );
    expect(result).toBe(true);
  });
});
