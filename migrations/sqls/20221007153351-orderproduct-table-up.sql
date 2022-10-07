/* Replace with your SQL commands */
CREATE TABLE Orderproducts (
     id SERIAL PRIMARY KEY,
     quantity INTEGER NOT NULL,
     product_id INTEGER REFERENCES products(id) NOT NULL,
     order_id INTEGER REFERENCES orders(id) NOT NULL
     );