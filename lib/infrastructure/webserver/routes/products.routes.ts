import express from 'express'

import { getCategory, getCategories, createCategory, updateCategory, deleteCategory } from '../../../interfaces/controllers/Products.controller'

import { createCategoryMiddleware } from '../../../interfaces/middleware/Products.middleware'

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

export default ProductsRouter
