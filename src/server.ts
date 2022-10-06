import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import productofroutes from './routes/product-route';
import userofroutes from './routes/user-route';
import orderofroutes from './routes/order-route';
import config from './config';

dotenv.config();
const app: express.Application = express();
const PORT = config.port || 8000;

app.use(express.json());
app.use(
  cors({
    origin: `http://localhost:${PORT}`,
  })
);

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});
app.use(bodyParser.json());
app.use('/', productofroutes);
app.use('/', userofroutes);
app.use('/', orderofroutes);

app.listen(PORT, function () {
  console.log(`starting app on port ${PORT}`);
});

export default app;
