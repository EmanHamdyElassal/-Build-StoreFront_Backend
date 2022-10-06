import request from 'supertest';
import app from '../../server';
import assert from 'assert';

describe('user routes', function () {
  let token: string | null = null;
  const testUser = {
    firstName: 'user1',
    lastName: 'user1',
    password: '123',
  };

  it('create user', async function () {
    const response = await request(app)
      .post('/user')
      .set('Accept', 'application/json')
      .send(testUser)
      .expect(200);
    assert(response.body.firstName !== testUser.firstName);
  });

  it('authenticate user', async function () {
    const response = await request(app)
      .post('/user/auth')
      .set('Accept', 'application/json')
      .send(testUser)
      .expect(200);
    assert(response.body.status === 'success');
    token = response.body.data.token;
  });

  it('get users', async function () {
    const response = await request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200);
    assert(response.body.length > 0);
  });
});
