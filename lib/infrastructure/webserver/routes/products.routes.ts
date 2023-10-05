import express from 'express'

import {
    getCategory,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
} from '../../../interfaces/controllers/Products.controller'

import { createCategoryMiddleware, createProductMiddleware } from '../../../interfaces/middleware/Products.middleware'

const ProductsRouter = express.Router()

// Get category
ProductsRouter.get('/categories/:id', getCategory)

// Get all categories
ProductsRouter.get('/categories', getCategories)

// Create a category
ProductsRouter.post('/categories', createCategoryMiddleware, createCategory)

// Update a category
ProductsRouter.put('/categories/:id', updateCategory)

// Delete a category
ProductsRouter.delete('/categories/:id', deleteCategory)

// Get product
ProductsRouter.get('/:id', getProduct)

// Get all products
ProductsRouter.get('/', getProducts)

// Create a product
ProductsRouter.post('/', createProductMiddleware, createProduct)

// Update a product
ProductsRouter.put('/:id', updateProduct)

// Delete a product
ProductsRouter.delete('/:id', deleteProduct)

export default ProductsRouter
