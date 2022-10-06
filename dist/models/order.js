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
exports.OrderfromStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderfromStore {
    static create(orderstorefront) {
        throw new Error('Method not implemented.');
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const order = yield connection.query('SELECT * FROM orders WHERE id=($1)', [id]);
                connection.release();
                return order.rows[0];
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    }
    index(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const order = yield connection.query('SELECT * FROM orders WHERE user_id=($1)', [user_id]);
                connection.release();
                return order.rows;
            }
            catch (err) {
                throw new Error(`not get orders. Error: ${err}`);
            }
        });
    }
    create(ord) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const order = yield connection.query('INSERT INTO orders ( Orderstatus, user_id) VALUES($1, $2) RETURNING *');
                const orders = order.rows[0];
                connection.release();
                return orders;
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    }
    addProduct(quantity, orderID, productID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const order = yield connection.query('INSERT INTO order_products ( quantity, order_id, product_id ) VALUES($1, $2, $3) RETURNING *', [quantity, orderID, productID]);
                connection.release();
                return true;
            }
            catch (err) {
                throw new Error(`not add new order ${productID}. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const order = yield connection.query('DELETE FROM orders WHERE id=($1)', [
                    id,
                ]);
                const orders = order.rows[0];
                connection.release();
                return orders;
            }
            catch (err) {
                throw new Error(`not delete order ${id}. Error: ${err}`);
            }
        });
    }
}
exports.OrderfromStore = OrderfromStore;
