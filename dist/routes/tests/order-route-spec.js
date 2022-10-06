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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const assert_1 = __importDefault(require("assert"));
const user_1 = require("../../models/user");
const database_1 = __importDefault(require("../../database"));
const product_1 = require("../../models/product");
describe('Order routes', function () {
    const userStore = new user_1.UserStore();
    const productStore = new product_1.ProductList();
    const testUser = {
        firstName: 'user1',
        lastName: 'user1',
        password: '123',
    };
    const testProduct = {
        productName: 'product test',
        price: 452,
        category: 'category test',
    };
    let token = null;
    const testOrder = {
        Orderstatus: 'active',
        user_id: '-1',
    };
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        const createUser = yield userStore.create(testUser);
        testUser.id = createUser.id;
        testOrder.user_id = createUser.id.toString();
        const response = yield (0, supertest_1.default)(server_1.default)
            .post('/user/auth')
            .set('Accept', 'application/json')
            .send(testUser);
        token = response.body.data.token;
        const createProduct = yield productStore.create(testProduct);
        testProduct.id = createProduct.id;
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.default.connect();
        yield conn.query('DELETE FROM order_products');
        yield conn.query('DELETE FROM orders');
        yield conn.query('DELETE FROM products');
        yield conn.query('DELETE FROM users');
        conn.release();
    }));
    it('create an order', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .post('/order')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .send(testOrder)
            .expect(200);
        (0, assert_1.default)(response.body.status, testOrder.Orderstatus);
        testOrder.id = response.body.id;
    }));
    it('index all orders', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .get('/order')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .send()
            .expect(200);
        (0, assert_1.default)(response.body.length > 0);
    }));
    it('add a new product', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .post(`/order/${testOrder.id}/product`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .send({ quantity: 21, productId: testProduct.id })
            .expect(200);
        (0, assert_1.default)(response.body, 'true');
    }));
});
