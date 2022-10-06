"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const product_route_1 = __importDefault(require("./routes/product-route"));
const user_route_1 = __importDefault(require("./routes/user-route"));
const order_route_1 = __importDefault(require("./routes/order-route"));
const config_1 = __importDefault(require("./config"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = config_1.default.port || 8000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: `http://localhost:${PORT}`,
}));
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use(body_parser_1.default.json());
app.use('/', product_route_1.default);
app.use('/', user_route_1.default);
app.use('/', order_route_1.default);
app.listen(PORT, function () {
    console.log(`starting app on port ${PORT}`);
});
exports.default = app;
