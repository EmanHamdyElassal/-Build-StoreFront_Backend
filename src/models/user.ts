import Client from '../database';
import JwtHelper from '../routes/jwt-helper';

export type UserInfo = {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  async show(id: string): Promise<UserInfo> {
    try {
      const connect = await Client.connect();
      const usersQuery = await connect.query(
        'SELECT * FROM users WHERE id=($1)',
        [id]
      );
      connect.release();
      return usersQuery.rows[0];
    } catch (err) {
      throw new Error(`not find user ${id}. Error: ${err}`);
    }
  }

  async index(): Promise<UserInfo[]> {
    try {
      const connect = await Client.connect();
      const usersQuery = await connect.query('SELECT * FROM users');
      connect.release();
      return usersQuery.rows;
    } catch (err) {
      throw new Error(`not get users. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<UserInfo> {
    try {
      const connect = await Client.connect();
      const usersQuery = await connect.query(
        'DELETE FROM users WHERE id=($1)',
        [id]
      );
      const user = usersQuery.rows[0];
      connect.release();
      return user;
    } catch (err) {
      throw new Error(`not delete user ${id}. Error: ${err}`);
    }
  }

  async create(u: UserInfo): Promise<UserInfo> {
    try {
      const connect = await Client.connect();
      const hashFunction = JwtHelper.EncPassword(u.password);
      const usersQuery = await connect.query(
        'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *',
        [u.firstName, u.lastName, hashFunction]
      );
      const user = usersQuery.rows[0];
      connect.release();
      return user;
    } catch (err) {
      throw new Error(`not add a new user ${u}. Error: ${err}`);
    }
  }

  async auth(firstName: string, password: string): Promise<UserInfo | null> {
    try {
      const connect = await Client.connect();
      const usersQuery = await connect.query(
        'SELECT * FROM users WHERE first_name=($1)',
        [firstName]
      );
      if (usersQuery.rows.length) {
        const dbpass = usersQuery.rows[0].password;
        const isPasswordExist = JwtHelper.EncryptPassword(password, dbpass);
        if (isPasswordExist) {
          return usersQuery.rows[0];
        }
      }
      connect.release();
      return null;
    } catch (err) {
      throw new Error(`not log in by user ${firstName}. Error: ${err}`);
    }
  }
}
