import { Pool } from 'pg';
import config from './config';

const pool = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
});

export default pool;