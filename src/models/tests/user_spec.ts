import pool from '../../database';
import { UserInfo, UserStore } from '../user';

const Store = new UserStore();

describe('User Model', () => {
  it('method for index', async () => {
    expect(Store.index).toBeDefined();
  });
  it('method for show', async () => {
    expect(Store.show).toBeDefined();
  });
  it('method for create', async () => {
    expect(Store.create).toBeDefined();
  });
});

describe('Create User method test', () => {
  const user = {
    firstName: 'eman',
    lastName: 'hamdy',
    password: '15101543',
  } as UserInfo;

  beforeAll(async () => {
    const Newuser = await Store.create(user);
  });

  afterAll(async () => {
    const connections = await pool.connect();
    await connections.query('DELETE FROM users');
    connections.release();
  });

  it('index to return all users', async () => {
    const ListOfUser = await Store.index();
    expect(ListOfUser.length).toBeGreaterThan(0);
  });

  it('create user to return new user', async () => {
    const testNewUser = {
      firstName: 'eman',
      lastName: 'hanmdy',
      password: '15101543',
    } as UserInfo;

    const newuser = await Store.create(testNewUser);
    expect(newuser.id).toBeGreaterThan(0);
  });

  it('show method should return a specific user', async () => {
    const testNewUsers = {
      firstName: 'user test',
      lastName: 'user test',
      password: 'category test',
    } as UserInfo;
    const newusers = await Store.create(testNewUsers);
    const usersShow = await Store.show(newusers.id.toString());

    expect(newusers.id).toEqual(usersShow.id);
  });
});
