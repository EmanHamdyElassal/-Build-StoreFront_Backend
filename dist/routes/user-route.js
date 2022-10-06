"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../config"));
const jwt_helper_1 = __importDefault(require("./jwt-helper"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userofroutes = express_1.default.Router();
userofroutes.get('/user', jwt_helper_1.default.AuthenticateToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Userstore = new user_1.UserStore();
        const userRoute = yield Userstore.index();
        res.send(userRoute);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
}));
userofroutes.get('/user/:id', jwt_helper_1.default.AuthenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Userstore = new user_1.UserStore();
        const userRoute = yield Userstore.show(req.params.id);
        res.send(userRoute);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
}));
userofroutes.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const EM = req.body;
        const Userstore = new user_1.UserStore();
        const userRoute = yield Userstore.create(EM);
        res.send(userRoute);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
}));
userofroutes.post('/user/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, password } = req.body;
        const Userstore = new user_1.UserStore();
        const user = yield Userstore.auth(firstName, password);
        const tokenAuth = jsonwebtoken_1.default.sign({ user }, config_1.default.token);
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
    }
    catch (err) {
        console.error(err);
        res.status(500).send('error');
    }
}));
exports.default = userofroutes;
