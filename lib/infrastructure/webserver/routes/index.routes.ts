import express from 'express'
import ProductsRouter from './products.routes'

const RouterMain = express.Router()

RouterMain.use('/products', ProductsRouter)

export default RouterMain
