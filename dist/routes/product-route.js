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
const product_1 = require("../models/product");
const jwt_helper_1 = __importDefault(require("./jwt-helper"));
const productofroutes = express_1.default.Router();
productofroutes.get('/product', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storeProduct = new product_1.ProductList();
        const productRoute = yield storeProduct.index();
        res.send(productRoute);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
}));
productofroutes.get('/product/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storeProduct = new product_1.ProductList();
        const productRoute = yield storeProduct.delete(req.params.id);
        res.send(productRoute);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
}));
productofroutes.get('/product/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storeProduct = new product_1.ProductList();
        const productRoute = yield storeProduct.show(req.params.id);
        res.send(productRoute);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
}));
productofroutes.post('/product', jwt_helper_1.default.AuthenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const E = req.body;
        const storeProduct = new product_1.ProductList();
        const productRoute = yield storeProduct.create(E);
        res.send(productRoute);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
}));
exports.default = productofroutes;
