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
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const jwt_helper_1 = __importDefault(require("../routes/jwt-helper"));
class UserStore {
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const usersQuery = yield connect.query('SELECT * FROM users WHERE id=($1)', [id]);
                connect.release();
                return usersQuery.rows[0];
            }
            catch (err) {
                throw new Error(`not find user ${id}. Error: ${err}`);
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const usersQuery = yield connect.query('SELECT * FROM users');
                connect.release();
                return usersQuery.rows;
            }
            catch (err) {
                throw new Error(`not get users. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const usersQuery = yield connect.query('DELETE FROM users WHERE id=($1)', [id]);
                const user = usersQuery.rows[0];
                connect.release();
                return user;
            }
            catch (err) {
                throw new Error(`not delete user ${id}. Error: ${err}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const hashFunction = jwt_helper_1.default.EncPassword(u.password);
                const usersQuery = yield connect.query('INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *', [u.firstName, u.lastName, hashFunction]);
                const user = usersQuery.rows[0];
                connect.release();
                return user;
            }
            catch (err) {
                throw new Error(`not add a new user ${u}. Error: ${err}`);
            }
        });
    }
    auth(firstName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const usersQuery = yield connect.query('SELECT * FROM users WHERE first_name=($1)', [firstName]);
                if (usersQuery.rows.length) {
                    const dbpass = usersQuery.rows[0].password;
                    const isPasswordExist = jwt_helper_1.default.EncryptPassword(password, dbpass);
                    if (isPasswordExist) {
                        return usersQuery.rows[0];
                    }
                }
                connect.release();
                return null;
            }
            catch (err) {
                throw new Error(`not log in by user ${firstName}. Error: ${err}`);
            }
        });
    }
}
exports.UserStore = UserStore;
