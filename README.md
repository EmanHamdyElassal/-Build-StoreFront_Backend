# Storefront Backend Project

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Instruction for running the project correctly

1. Run comand `npm i`
2. Configure the ENV file to the spicified data section
3. Run migrations `db-migrate up`
4. Run the required test

### Database Creation

1. Install `postgreSQL`
2. Run this command `CREATE DATABASE shopping_app_test`
3. Run this command `CREATE USER test_user PASSWORD 'password' CREATEDB CREATEUSER;`

### Evironment Data

BACKEND_PORT = 8000 
ENV = dev 
POSTGRES_PORT = 5432 
POSTGRES_HOST = 127.0.0.1 
POSTGRS_DB: storefrontbackend
POSTGRES_USER: postgres
POSTGRES_PASSWORD: postgres
PGAdmin Passwrd: 1234567890
BCRYPT_PASSWORD = keep_coding 
SALT_ROUNDS = 10 
TOKEN = udacity-token

###  Test Database
POSTGRES_PORT = 5432 
POSTGRES_HOST = 127.0.0.1 
POSTGRES_TEST_DB: storefrontbackendtest
POSTGRES_USER: postgres
POSTGRES_PASSWORD: postgres
PGAdmin Passwrd: 1234567890

-- Running the server:
npm run start


-- Testing:
npm run test

-- Formatting prettier:
npm run prettier

-- Linting:
npm run lint

-- Watcher:
npm run watch
