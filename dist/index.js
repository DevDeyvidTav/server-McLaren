"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const client_1 = require("@prisma/client");
const CreateUser_1 = require("./services/CreateUser");
const AuthUser_1 = require("./services/AuthUser");
const DetailUser_1 = require("./services/DetailUser");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const createCategory_1 = require("./services/createCategory");
const listCategory_1 = require("./services/listCategory");
const createProduct_1 = require("./services/createProduct");
const getProductsByCategory_1 = require("./services/getProductsByCategory");
const createOrder_1 = require("./services/createOrder");
const deleteOrder_1 = require("./services/deleteOrder");
const addItems_1 = require("./services/addItems");
const deleteItem_1 = require("./services/deleteItem");
const sendOrder_1 = require("./services/sendOrder");
const listOrder_1 = require("./services/listOrder");
const detailOrder_1 = require("./services/detailOrder");
const finishOrder_1 = require("./services/finishOrder");
const getProductsById_1 = require("./services/getProductsById");
const vefifyOrderDraft_1 = require("./services/vefifyOrderDraft");
const addAdress_1 = require("./services/addAdress");
const addOrderPrice_1 = require("./services/addOrderPrice");
const addPaymentMethod_1 = require("./services/addPaymentMethod");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient({
    log: ['query']
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// user routes
app.get('/me', isAuthenticated_1.isAuthenticated, async (req, res) => {
    const user_id = req.user_id;
    const user = await (0, DetailUser_1.DetailUser)(user_id);
    res.json(user);
});
app.post('/session', async (req, res) => {
    const { email, password } = req.body;
    const auth = await (0, AuthUser_1.AuthUser)(email, password);
    return res.json(auth);
});
app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    const user = await (0, CreateUser_1.CreateUser)(name, email, password);
    return res.json(user);
});
//categories routes
app.get('/categories', isAuthenticated_1.isAuthenticated, async (req, res) => {
    const categories = await (0, listCategory_1.listCategory)();
    return res.json(categories);
});
app.post('/category', isAuthenticated_1.isAuthenticated, async (req, res) => {
    const name = req.body;
    const category = await (0, createCategory_1.createCategory)(name);
    return res.json(category);
});
app.get('/product', async (req, res) => {
    const products = await prisma.product.findMany({
        select: {
            description: true,
            name: true,
            price: true,
            id: true,
        }
    });
    return res.json(products);
});
app.get('/product/id', isAuthenticated_1.isAuthenticated, async (req, res) => {
    const product_id = req.query.product_id;
    const product = await (0, getProductsById_1.getProductsById)(product_id);
    return res.json(product);
});
app.delete('/product', async (req, res) => {
    const product_id = req.query.product_id;
    const product = await prisma.product.delete({
        where: {
            id: product_id
        }
    });
    return res.json(product);
});
app.post('/product', async (req, res) => {
    const { name, price, description, category_id } = req.body;
    const product = await (0, createProduct_1.createProducts)(name, price, description, category_id);
    return res.json(product);
});
app.get('/category/product', isAuthenticated_1.isAuthenticated, async (req, res) => {
    const category_id = req.query.category_id;
    const productById = await (0, getProductsByCategory_1.getProductsByCategory)(category_id);
    return res.json(productById);
});
app.post("/order", isAuthenticated_1.isAuthenticated, async (req, res) => {
    const { name, phone, user_id } = req.body;
    const order = await (0, createOrder_1.createOrder)(name, phone, user_id);
    return res.json(order);
});
app.delete("/order", async (req, res) => {
    const order_id = req.query.order_id;
    const order = await (0, deleteOrder_1.deleteOrder)(order_id);
    return res.json(order);
});
app.post('/order/add', isAuthenticated_1.isAuthenticated, async (req, res) => {
    const { order_id, product_id, amount } = req.body;
    const order = await (0, addItems_1.addItems)(order_id, product_id, amount);
    return res.json(order);
});
app.delete('/order/remove', isAuthenticated_1.isAuthenticated, async (req, res) => {
    const item_id = req.query.item_id;
    const item = await (0, deleteItem_1.deleteItem)(item_id);
    return res.json(item);
});
app.put('/order/send', isAuthenticated_1.isAuthenticated, async (req, res) => {
    const { order_id } = req.body;
    const order = await (0, sendOrder_1.sendOrder)(order_id);
    return res.json(order);
});
app.get('/order/user/id', async (req, res) => {
    const user_id = req.query.user_id;
    const order = await prisma.order.findFirst({
        where: {
            user_id: user_id,
            draft: false
        },
    });
    return res.json(order);
});
app.get('/order/delivery', async (req, res) => {
    const orders = await prisma.order.findMany({
        where: {
            status: true
        }
    });
    return res.json(orders);
});
app.get('/orders', async (req, res) => {
    const orders = await (0, listOrder_1.listOrder)();
    return res.json(orders);
});
app.get('/order/detail', async (req, res) => {
    const order_id = req.query.order_id;
    const order = await (0, detailOrder_1.detailOrder)(order_id);
    return res.json(order);
});
app.put('/order/add-address', isAuthenticated_1.isAuthenticated, async (req, res) => {
    const { address, order_id } = req.body;
    const order = await (0, addAdress_1.addAdress)(address, order_id);
    return res.json(order);
});
app.put('/order/add-total-price', isAuthenticated_1.isAuthenticated, async (req, res) => {
    const { price, order_id } = req.body;
    const order = await (0, addOrderPrice_1.addOrderPrice)(price, order_id);
    return res.json(order);
});
app.put('/order/add-payment-method', isAuthenticated_1.isAuthenticated, async (req, res) => {
    const { payment_method, order_id } = req.body;
    const order = await (0, addPaymentMethod_1.addPaymentMethod)(payment_method, order_id);
    return res.json(order);
});
app.put('/order/finish', async (req, res) => {
    const { order_id } = req.body;
    const order = await (0, finishOrder_1.finishOrder)(order_id);
    return res.json(order);
});
app.get('/order/verifydraft', async (req, res) => {
    const user_id = req.query.user_id;
    const order = await (0, vefifyOrderDraft_1.VerifyOrderDraft)(user_id);
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
app.listen(process.env.port, () => {
    console.log('listening on port 8080');
});
//# sourceMappingURL=index.js.map