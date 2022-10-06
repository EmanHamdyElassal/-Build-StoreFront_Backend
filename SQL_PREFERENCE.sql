/* Login to PSQL as postgres user */
    psql -U postgres

    /* Create a new database */
    CREATE DATABASE storefrontbackend;

    /* Connect to the new database */
    \c storefrontbackend;

    /* Create the users table */
    CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_Name VARCHAR(50) NOT NULL,
    last_Name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL );

    /* Insert some data in tables */
INSERT INTO orders(status, user_id) VALUES ('inPrepair',2);

INSERT INTO order_Products(quantity, Product_id, order_id) VALUES (20,1,2);
    