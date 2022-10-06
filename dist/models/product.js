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
exports.ProductList = void 0;
const database_1 = __importDefault(require("../database"));
class ProductList {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const productStore = yield connect.query('SELECT * FROM products');
                connect.release();
                return productStore.rows;
            }
            catch (err) {
                throw new Error(`not get product. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const productStore = yield connect.query('SELECT * FROM products WHERE id=($1)', [id]);
                connect.release();
                return productStore.rows[0];
            }
            catch (err) {
                throw new Error(`not find product ${id}. Error: ${err}`);
            }
        });
    }
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const productStore = yield connect.query('INSERT INTO products (productName,price,category) VALUES ($1,$2,$3) RETURNING *', [p.productName, p.price, p.category]);
                const product = productStore.rows[0];
                connect.release();
                return product;
            }
            catch (err) {
                throw new Error(`not add a new product ${JSON.stringify(p)}. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const productStore = yield connect.query('DELETE FROM products WHERE id=($1)', [id]);
                const product = productStore.rows[0];
                connect.release();
                return product;
            }
            catch (err) {
                throw new Error(`not delete product ${id}. Error: ${err}`);
            }
        });
    }
}
exports.ProductList = ProductList;
