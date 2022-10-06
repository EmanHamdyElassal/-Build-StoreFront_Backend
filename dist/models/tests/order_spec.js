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
const database_1 = __importDefault(require("../../database"));
const user_1 = require("../user");
const product_1 = require("../product");
const order_1 = require("../order");
const userStore = new user_1.UserStore();
const productList = new product_1.ProductList();
const orderfromStore = new order_1.OrderfromStore();
describe('Order models', () => {
    it('method for index', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(orderfromStore.index).toBeDefined();
    }));
    it('method for addProduct', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(orderfromStore.addProduct).toBeDefined();
    }));
    it('method for create', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(orderfromStore.create).toBeDefined();
    }));
    it('method for show', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(orderfromStore.show).toBeDefined();
    }));
});
describe('Create Order method', () => {
    const orderstorefront = {
        Orderstatus: 'complete',
        user_id: '-1',
    };
    const userstorefront = {
        firstName: 'user store',
        lastName: 'user store',
        password: '1510',
    };
    const productstorefront = {
        productName: 'product test',
        category: 'category test',
        price: 1543,
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const makeUser = yield userStore.create(userstorefront);
        userstorefront.id = makeUser.id;
        orderstorefront.user_id = makeUser.id.toString();
        const makeOrder = yield orderfromStore.create(orderstorefront);
        orderstorefront.id = makeOrder.id;
        const makeProduct = yield productList.create(productstorefront);
        productstorefront.id = makeProduct.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connectDatabase = yield database_1.default.connect();
        yield connectDatabase.query('DELETE FROM users');
        yield connectDatabase.query('DELETE FROM order_products');
        yield connectDatabase.query('DELETE FROM orders');
        yield connectDatabase.query('DELETE FROM products');
        connectDatabase.release();
    }));
    it('index all orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const ordersListIndex = yield orderfromStore.index(userstorefront.id);
        expect(ordersListIndex.length).toBeGreaterThan(0);
    }));
    it('ADD new order', () => __awaiter(void 0, void 0, void 0, function* () {
        const testOrder = {
            Orderstatus: 'active',
            user_id: userstorefront.id.toString(),
        };
        const createOrder = yield orderfromStore.create(testOrder);
        expect(createOrder.id).toBeGreaterThan(0);
    }));
    it('show specific order', () => __awaiter(void 0, void 0, void 0, function* () {
        const testOrder = {
            status: 'active',
            userId: userstorefront.id.toString(),
        };
        const createOrder = yield orderfromStore.create(testOrder);
        const order = yield orderfromStore.show(createOrder.id.toString());
        expect(createOrder.id).toEqual(order.id);
    }));
    it('addProduct to order', () => __awaiter(void 0, void 0, void 0, function* () {
        const testOrder = {
            status: 'active',
            userId: userstorefront.id.toString(),
        };
        const createOrder = yield orderfromStore.create(testOrder);
        const result = yield orderfromStore.addProduct(3, createOrder.id, productstorefront.id);
        expect(result).toBe(true);
    }));
});
