import { Request, Response, NextFunction } from 'express';
import { UserInfo } from '../models/user';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import config from '../config';

class JwtHelper {
  static getCurrentUser(req: Request): UserInfo {
    const authorizet = req.headers.authorization || '';
    const tokenSecurity = authorizet.split(' ')[1];
    const jwtResponse = Jwt.verify(tokenSecurity, config.token || '');
    return (<any>jwtResponse).user;
  }

  static AuthenticateToken(req: Request, res: Response, next: NextFunction) {
    try {
      JwtHelper.getCurrentUser(req);
      next();
    } catch (error) {
      res.status(401);
      res.send('user Unauthoriz');
      return;
    }
  }

  static EncPassword(password: string) {
    const salt = parseInt(config.salt as string, 10);
    return bcrypt.hashSync(`${password}${config.pepper}`, salt);
  }

  static EncryptPassword(password: string, EncPassword: string): boolean {
    return bcrypt.compareSync(`${password}${config.pepper}`, EncPassword);
  }
}
export default JwtHelper;
