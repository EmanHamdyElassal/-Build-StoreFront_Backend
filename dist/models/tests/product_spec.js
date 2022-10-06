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
const product_1 = require("../product");
const database_1 = __importDefault(require("../../database"));
const Store = new product_1.ProductList();
describe('Model for product', () => {
    it(' index method', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(Store.index).toBeDefined();
    }));
    it('method for show', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(Store.show).toBeDefined();
    }));
    it('method for create', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(Store.create).toBeDefined();
    }));
    it('method for Delete', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(Store.delete).toBeDefined();
    }));
});
describe('method for Product', () => {
    /* const product = {
      name: 'product test',
      price: 111,
      category: 'category test',
    } as Product; */
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield Store.create({
            productName: 'product',
            price: 100,
            id: 0,
            category: 'test product',
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connections = yield database_1.default.connect();
        yield connections.query('DELETE FROM products');
        connections.release();
    }));
    it('use index to return all products', () => __awaiter(void 0, void 0, void 0, function* () {
        const List = yield Store.index();
        expect(List.length).toBeGreaterThan(0);
    }));
    it('create to return a new product', () => __awaiter(void 0, void 0, void 0, function* () {
        const NewProduct = {
            productName: 'Newproduct',
            price: 1500,
            category: 'New',
        };
        const CreateNewProduct = yield Store.create(NewProduct);
        expect(CreateNewProduct.id).toBeGreaterThan(0);
    }));
    it('show method to return specificProduct', () => __awaiter(void 0, void 0, void 0, function* () {
        const showProduct = {
            productName: 'showSpecificProduct',
            price: 111,
            category: 'Specific Product',
        };
        const NewProduct = yield Store.create(showProduct);
        const product = yield Store.show(NewProduct.id.toString());
        expect(NewProduct.id).toEqual(product.id);
    }));
});
