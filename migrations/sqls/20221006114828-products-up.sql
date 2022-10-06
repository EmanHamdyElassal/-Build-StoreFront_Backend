/* Replace with your SQL commands */
CREATE TABLE if NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    productName VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(50) NOT NULL
    );