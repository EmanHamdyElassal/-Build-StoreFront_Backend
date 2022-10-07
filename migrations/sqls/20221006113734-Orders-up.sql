/* Replace with your SQL commands */
CREATE TABLE  if not EXISTS orders (
    id SERIAL PRIMARY KEY,
    Orderstatus VARCHAR(50) NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL);