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
import { getProductsById } from "./services/getProductsById";
import { VerifyOrderDraft } from "./services/vefifyOrderDraft";
import { addAdress } from "./services/addAdress";
import { addOrderPrice } from "./services/addOrderPrice";
import { addPaymentMethod } from "./services/addPaymentMethod";

const app = express()

const prisma = new PrismaClient({
  log: ['query']
})

app.use(express.json())
app.use(cors());
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
app.get('/product',  async (req, res) => {
  const products = await prisma.product.findMany({
    select:{
      description: true,
      name: true, 
      price: true,
      id: true,
    }
    
  })
  return res.json(products)
})
app.get('/product/id', isAuthenticated, async (req, res) => {
  const product_id = req.query.product_id as string
  const product = await getProductsById(product_id)
  return res.json(product)
})
app.delete('/product', async (req, res) => {
const product_id = req.query.product_id as string
const product = await prisma.product.delete({
  where:{
    id: product_id
  }

})
return res.json(product)

})
app.post('/product', async (req, res) => {
  const { name, price, description, category_id } = req.body;

  const product = await createProducts(name, price, description, category_id)

  return res.json(product)
})
app.get('/category/product', isAuthenticated, async (req, res) => {
  const  category_id  = req.query.category_id as string
  const productById = await getProductsByCategory(category_id)
  return res.json(productById)
})
app.post( "/order", isAuthenticated, async (req, res) => {
  const{ name, phone, user_id} = req.body
  const order = await createOrder(name, phone, user_id)
  return res.json(order)
})
app.delete("/order", async (req, res) => {
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
app.get('/order/user/id', async (req, res) =>{
  const user_id = req.query.user_id as string
  const order = await prisma.order.findFirst({
    where: {
      user_id: user_id,
      draft: false
    },
    
  })
  return res.json(order)
})
app.get('/order/delivery', async (req, res) =>{
  const orders = await prisma.order.findMany({
    where:{
      status: true
    }
  })
  return res.json(orders)
})
app.get('/orders', async (req, res) => {
  const orders = await listOrder()
  return res.json(orders)
})
app.get('/order/detail', async (req, res) => {
  const order_id = req.query.order_id as string
  const order = await detailOrder(order_id)
  return res.json(order) 
})
app.put('/order/add-address', isAuthenticated, async (req, res) => {
  const { address, order_id} = req.body
  const order = await addAdress(address, order_id)
  return res.json(order)
})
app.put('/order/add-total-price', isAuthenticated, async (req, res) => {
  const  { price, order_id } = req.body
  const order = await addOrderPrice(price, order_id)
  return res.json(order)
})
app.put('/order/add-payment-method', isAuthenticated, async (req, res) => {
  const {payment_method, order_id } = req.body
  const order = await addPaymentMethod(payment_method, order_id)
  return res.json(order)
})
app.put('/order/finish', async (req, res) => {
  const {order_id} = req.body 
  const order = await finishOrder(order_id)
  return res.json(order)
})
app.get('/order/verifydraft', async (req, res) => {
  const user_id = req.query.user_id as string
  const order = await VerifyOrderDraft(user_id)
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
app.listen(process.env.port, () => {
  console.log('listening on port 8080')
})

