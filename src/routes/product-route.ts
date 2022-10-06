import express, { Request, Response } from 'express';
import { ProductList, Product } from '../models/product';
import JwtHelper from './jwt-helper';

const productofroutes = express.Router();
productofroutes.get('/product', async (_req: Request, res: Response) => {
  try {
    const storeProduct = new ProductList();
    const productRoute = await storeProduct.index();
    res.send(productRoute);
  } catch (error) {
    console.log(error);
    res.status(500).send('error');
  }
});

productofroutes.get(
  '/product/delete/:id',
  async (req: Request, res: Response) => {
    try {
      const storeProduct = new ProductList();
      const productRoute = await storeProduct.delete(req.params.id);
      res.send(productRoute);
    } catch (error) {
      console.log(error);
      res.status(500).send('error');
    }
  }
);

productofroutes.get('/product/:id', async (req: Request, res: Response) => {
  try {
    const storeProduct = new ProductList();
    const productRoute = await storeProduct.show(req.params.id);
    res.send(productRoute);
  } catch (error) {
    console.log(error);
    res.status(500).send('error');
  }
});

productofroutes.post(
  '/product',
  JwtHelper.AuthenticateToken,
  async (req: Request, res: Response) => {
    try {
      const E: Product = req.body;
      const storeProduct = new ProductList();
      const productRoute = await storeProduct.create(E);
      res.send(productRoute);
    } catch (error) {
      console.log(error);
      res.status(500).send('error');
    }
  }
);
export default productofroutes;
