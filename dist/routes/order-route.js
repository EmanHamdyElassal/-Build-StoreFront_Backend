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
const jwt_helper_1 = __importDefault(require("./jwt-helper"));
const order_1 = require("../models/order");
const orderofroutes = express_1.default.Router();
orderofroutes.get('/order', jwt_helper_1.default.AuthenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createorder = new order_1.OrderfromStore();
        const currentUser = jwt_helper_1.default.getCurrentUser(req).id;
        const createOrder = yield createorder.index(currentUser);
        res.send(createOrder);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
}));
orderofroutes.post('/order', jwt_helper_1.default.AuthenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = new order_1.OrderfromStore();
        const ord = req.body;
        const postOrder = yield order.create(ord);
        res.send(postOrder);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
}));
orderofroutes.post('/order/:id/product', jwt_helper_1.default.AuthenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Orderstore = new order_1.OrderfromStore();
        const orderId = parseInt(req.params.id);
        const orderquantity = parseInt(req.body.quantity);
        const product = req.body.productId;
        const createProduct = yield Orderstore.addProduct(orderquantity, orderId, product);
        res.json(createProduct);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
}));
exports.default = orderofroutes;
