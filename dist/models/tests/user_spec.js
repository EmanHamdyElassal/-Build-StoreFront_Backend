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
const Store = new user_1.UserStore();
describe('User Model', () => {
    it('method for index', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(Store.index).toBeDefined();
    }));
    it('method for show', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(Store.show).toBeDefined();
    }));
    it('method for create', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(Store.create).toBeDefined();
    }));
});
describe('Create User method test', () => {
    const user = {
        firstName: 'eman',
        lastName: 'hamdy',
        password: '15101543',
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const Newuser = yield Store.create(user);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connections = yield database_1.default.connect();
        yield connections.query('DELETE FROM users');
        connections.release();
    }));
    it('index to return all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const ListOfUser = yield Store.index();
        expect(ListOfUser.length).toBeGreaterThan(0);
    }));
    it('create user to return new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const testNewUser = {
            firstName: 'eman',
            lastName: 'hanmdy',
            password: '15101543',
        };
        const newuser = yield Store.create(testNewUser);
        expect(newuser.id).toBeGreaterThan(0);
    }));
    it('show method should return a specific user', () => __awaiter(void 0, void 0, void 0, function* () {
        const testNewUsers = {
            firstName: 'user test',
            lastName: 'user test',
            password: 'category test',
        };
        const newusers = yield Store.create(testNewUsers);
        const usersShow = yield Store.show(newusers.id.toString());
        expect(newusers.id).toEqual(usersShow.id);
    }));
});
