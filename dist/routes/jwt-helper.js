"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
class JwtHelper {
    static getCurrentUser(req) {
        const authorizet = req.headers.authorization || '';
        const tokenSecurity = authorizet.split(' ')[1];
        const jwtResponse = jsonwebtoken_1.default.verify(tokenSecurity, config_1.default.token || '');
        return jwtResponse.user;
    }
    static AuthenticateToken(req, res, next) {
        try {
            JwtHelper.getCurrentUser(req);
            next();
        }
        catch (error) {
            res.status(401);
            res.send('user Unauthoriz');
            return;
        }
    }
    static EncPassword(password) {
        const salt = parseInt(config_1.default.salt, 10);
        return bcrypt_1.default.hashSync(`${password}${config_1.default.pepper}`, salt);
    }
    static EncryptPassword(password, EncPassword) {
        return bcrypt_1.default.compareSync(`${password}${config_1.default.pepper}`, EncPassword);
    }
}
exports.default = JwtHelper;
