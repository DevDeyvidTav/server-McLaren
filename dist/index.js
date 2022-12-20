"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
import "express-async-errors";
import { PrismaClient } from "@prisma/client";
import { CreateUser } from "./services/CreateUser";
import { AuthUser } from "./services/AuthUser";
import { DetailUser } from "./services/DetailUser";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { createCategory } from "./services/createCategory";
import { listCategory } from "./services/listCategory";
import { createProducts } from "./services/createProduct";
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("./config/multer"));
const path_1 = __importDefault(require("path"));
import { getProductsByCategory } from "./services/getProductsByCategory";
import { createOrder } from "./services/createOrder";
import { deleteOrder } from "./services/deleteOrder";
import { addItems } from "./services/addItems";
import { deleteItem } from "./services/deleteItem";
import { sendOrder } from "./services/sendOrder";
import { listOrder } from "./services/listOrder";
import { detailOrder } from "./services/detailOrder";
import { finishOrder } from "./services/finishOrder";
const app = (0, express_1.default)();
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
const prisma = new PrismaClient({
    log: ['query']
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp')));
// user routes
app.get('/me', isAuthenticated, async (req, res) => {
    const user_id = req.user_id;
    const user = await (0, DetailUser)(user_id);
    res.json(user);
});
app.post('/session', async (req, res) => {
    const { email, password } = req.body;
    const auth = await (0, AuthUser)(email, password);
    return res.json(auth);
});
app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    const user = await (0, CreateUser)(name, email, password);
    return res.json(user);
});
//categories routes
app.get('/categories', isAuthenticated, async (req, res) => {
    const categories = await (0, listCategory)();
    return res.json(categories);
});
app.post('/category', isAuthenticated, async (req, res) => {
    const name = req.body;
    const category = await (0, createCategory)(name);
    return res.json(category);
});
app.post('/product', isAuthenticated, upload.single('file'), async (req, res) => {
    const { name, price, description, category_id } = req.body;
    const { originalname, filename: banner } = req.file;
    const product = await (0, createProducts)(name, price, description, banner, category_id);
    return res.json(product);
});
app.get('/category/product', isAuthenticated, async (req, res) => {
    const category_id = req.query.category_id;
    const productById = await (0, getProductsByCategory)(category_id);
    return res.json(productById);
});
app.post("/order", isAuthenticated, async (req, res) => {
    const { name, adress } = req.body;
    const order = await (0, createOrder)(name, adress);
    return res.json(order);
});
app.delete("/order", isAuthenticated, async (req, res) => {
    const order_id = req.query.order_id;
    const order = await (0, deleteOrder)(order_id);
    return res.json(order);
});
app.post('/order/add', isAuthenticated, async (req, res) => {
    const { order_id, product_id, amount } = req.body;
    const order = await (0, addItems)(order_id, product_id, amount);
    return res.json(order);
});
app.delete('/order/remove', isAuthenticated, async (req, res) => {
    const item_id = req.query.item_id;
    const item = await (0, deleteItem)(item_id);
    return res.json(item);
});
app.put('/order/send', isAuthenticated, async (req, res) => {
    const { order_id } = req.body;
    const order = await (0, sendOrder)(order_id);
    return res.json(order);
});
app.get('/orders', isAuthenticated, async (req, res) => {
    const orders = await (0, listOrder)();
    return res.json(orders);
});
app.get('/order/detail', isAuthenticated, async (req, res) => {
    const order_id = req.query.order_id;
    const order = await (0, detailOrder)(order_id);
    return res.json(order);
});
app.put('/order/finish', isAuthenticated, async (req, res) => {
    const { order_id } = req.body;
    const order = await (0, finishOrder)(order_id);
    return res.json(order);
});
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        //Se for uma instancia do tipo error
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});
app.listen(3000, () => {
    console.log('listening on port 3000');
});
//# sourceMappingURL=index.js.map