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
describe('user routes', function () {
    let token = null;
    const testUser = {
        firstName: 'user1',
        lastName: 'user1',
        password: '123',
    };
    it('create user', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default)
                .post('/user')
                .set('Accept', 'application/json')
                .send(testUser)
                .expect(200);
            (0, assert_1.default)(response.body.firstName !== testUser.firstName);
        });
    });
    it('authenticate user', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default)
                .post('/user/auth')
                .set('Accept', 'application/json')
                .send(testUser)
                .expect(200);
            (0, assert_1.default)(response.body.status === 'success');
            token = response.body.data.token;
        });
    });
    it('get users', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default)
                .get('/user')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send()
                .expect(200);
            (0, assert_1.default)(response.body.length > 0);
        });
    });
});
