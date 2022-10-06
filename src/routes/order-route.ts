import express, { Request, Response } from 'express';
import JwtHelper from './jwt-helper';
import { OrderfromStore, Order } from '../models/order';

const orderofroutes = express.Router();

orderofroutes.get(
  '/order',
  JwtHelper.AuthenticateToken,
  async (req: Request, res: Response) => {
    try {
      const createorder = new OrderfromStore();
      const currentUser = JwtHelper.getCurrentUser(req).id;
      const createOrder = await createorder.index(currentUser);
      res.send(createOrder);
    } catch (error) {
      console.log(error);
      res.status(500).send('error');
    }
  }
);

orderofroutes.post(
  '/order',
  JwtHelper.AuthenticateToken,
  async (req: Request, res: Response) => {
    try {
      const order = new OrderfromStore();
      const ord: Order = req.body;
      const postOrder = await order.create(ord);
      res.send(postOrder);
    } catch (error) {
      console.log(error);
      res.status(500).send('error');
    }
  }
);

orderofroutes.post(
  '/order/:id/product',
  JwtHelper.AuthenticateToken,
  async (req: Request, res: Response) => {
    try {
      const Orderstore = new OrderfromStore();
      const orderId: number = parseInt(req.params.id);
      const orderquantity: number = parseInt(req.body.quantity);
      const product: number = req.body.productId;
      const createProduct = await Orderstore.addProduct(
        orderquantity,
        orderId,
        product
      );
      res.json(createProduct);
    } catch (error) {
      console.log(error);
      res.status(500).send('error');
    }
  }
);
export default orderofroutes;
