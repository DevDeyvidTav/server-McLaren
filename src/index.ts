import cors from "cors";
import express, { NextFunction, query, Request, Response } from "express";
import "express-async-errors"
import { PrismaClient } from "@prisma/client";
import { CreateUser } from "./services/CreateUser";
import { AuthUser } from "./services/AuthUser";
import { DetailUser } from "./services/DetailUser";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { createCategory } from "./services/createCategory";
import { listCategory } from "./services/listCategory";
import { createProducts } from "./services/createProduct";
import multer from 'multer';
import uploadConfig from './config/multer'
import path from "path";
import { getProductsByCategory } from "./services/getProductsByCategory";
import { createOrder } from "./services/createOrder";
import { deleteOrder } from "./services/deleteOrder";
import { addItems } from "./services/addItems";
import { deleteItem } from "./services/deleteItem";
import { sendOrder } from "./services/sendOrder";
import { listOrder } from "./services/listOrder";
import { detailOrder } from "./services/detailOrder";
import { finishOrder } from "./services/finishOrder";

const app = express()
const upload = multer(uploadConfig.upload("./tmp"));

const prisma = new PrismaClient({
  log: ['query']
})

app.use(express.json())
app.use(cors());
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp'))
)

// user routes
app.get('/me', isAuthenticated, async(req, res) => {
  const user_id = req.user_id;
  const user = await DetailUser(user_id)
  res.json(user)
})
app.post('/session', async (req, res) => {
  const { email, password } = req.body;
  const auth = await AuthUser(email, password)
  return res.json(auth)
})
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body
  const user = await CreateUser(name, email, password)
  return res.json(user)
})
//categories routes
app.get('/categories', isAuthenticated, async (req, res) => {
  const categories = await listCategory()
  return res.json(categories)
})
app.post('/category', isAuthenticated, async (req, res) => {
  const name = req.body
  const category = await createCategory(name)
  return res.json(category)
})

app.post('/product', isAuthenticated,  upload.single('file'), async (req, res) => {
  const { name, price, description, category_id } = req.body;
  const {originalname, filename: banner} = req.file;

  const product = await createProducts(name, price, description, banner, category_id)

  return res.json(product)
})
app.get('/category/product', isAuthenticated, async (req, res) => {
  const  category_id  = req.query.category_id as string
  const productById = await getProductsByCategory(category_id)
  return res.json(productById)
})
app.post( "/order", isAuthenticated, async (req, res) => {
  const{ name, adress } = req.body
  const order = await createOrder(name, adress)
  return res.json(order)
})
app.delete("/order", isAuthenticated, async (req, res) => {
  const order_id = req.query.order_id as string
  const order = await deleteOrder(order_id)
  return res.json(order)
})
app.post('/order/add', isAuthenticated, async (req, res) => {
  const { order_id, product_id, amount } = req.body
  const order = await addItems(order_id, product_id, amount)
  return res.json(order)
})
app.delete('/order/remove', isAuthenticated, async (req, res) => {
  const item_id = req.query.item_id as string
  const item = await deleteItem(item_id)
  return res.json(item)
})
app.put('/order/send', isAuthenticated, async (req, res) =>{
  const {order_id} = req.body
  const order = await sendOrder(order_id)
  return res.json(order)
})

app.get('/orders', isAuthenticated, async (req, res) => {
  const orders = await listOrder()
  return res.json(orders)
})
app.get('/order/detail', isAuthenticated, async (req, res) => {
  const order_id = req.query.order_id as string
  const order = await detailOrder(order_id)
  return res.json(order) 
})
app.put('/order/finish', isAuthenticated, async (req, res) => {
  const {order_id} = req.body 
  const order = await finishOrder(order_id)
  return res.json(order)
})



app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    //Se for uma instancia do tipo error
    return res.status(400).json({
      error: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  })

})
app.listen(3000, () => {
  console.log('listening on port 3000')
})