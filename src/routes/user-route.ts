import express, { Request, Response } from 'express';
import config from '../config';
import JwtHelper from './jwt-helper';
import { UserStore, UserInfo } from '../models/user';
import Jwt from 'jsonwebtoken';

const userofroutes = express.Router();
userofroutes.get(
  '/user',
  JwtHelper.AuthenticateToken,
  async (_req: Request, res: Response) => {
    try {
      const Userstore = new UserStore();
      const userRoute = await Userstore.index();
      res.send(userRoute);
    } catch (error) {
      console.log(error);
      res.status(500).send('error');
    }
  }
);

userofroutes.get(
  '/user/:id',
  JwtHelper.AuthenticateToken,
  async (req: Request, res: Response) => {
    try {
      const Userstore = new UserStore();
      const userRoute = await Userstore.show(req.params.id);
      res.send(userRoute);
    } catch (error) {
      console.log(error);
      res.status(500).send('error');
    }
  }
);

userofroutes.post('/user', async (req: Request, res: Response) => {
  try {
    const EM: UserInfo = req.body;
    const Userstore = new UserStore();
    const userRoute = await Userstore.create(EM);
    res.send(userRoute);
  } catch (error) {
    console.log(error);
    res.status(500).send('error');
  }
});

userofroutes.post('/user/auth', async (req: Request, res: Response) => {
  try {
    const { firstName, password } = req.body;
    const Userstore = new UserStore();
    const user = await Userstore.auth(firstName, password);
    const tokenAuth = Jwt.sign({ user }, config.token as string);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        msg: 'not correct userName or Password pls renter again',
      });
    }
    return res.json({
      status: 'success',
      data: { user, tokenAuth },
      msg: 'valid user',
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('error');
  }
});

export default userofroutes;
