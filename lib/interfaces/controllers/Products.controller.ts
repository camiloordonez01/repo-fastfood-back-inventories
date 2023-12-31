import { Request, Response, NextFunction } from 'express'
import { ErrorHandler, logger, ResponseHandler } from '../../shared/infrastructure/handler'

import {
    GetCategory,
    GetCategories,
    CreateCategory,
    UpdateCategory,
    DeleteCategory,
} from '../../application/use_cases/categories'
import {
    GetProduct,
    GetProducts,
    CreateProduct,
    UpdateProduct,
    DeleteProduct,
} from '../../application/use_cases/products'
import messages from '../../shared/messages'

const file = 'Products.controller.ts'
export const getCategory = async (req: Request, _: Response, next: NextFunction) => {
    try {
        interface ParamInterface {
            id?: number
        }
        const { id }: ParamInterface = req.params
        if (!id) throw new ErrorHandler(400, messages.PARAMS_ERROR)

        next(new ResponseHandler(201, await GetCategory(id)))
    } catch (error) {
        if (error instanceof Error) {
            logger.crit({
                level: 'crit',
                file,
                message: `${error.message}`,
                stack: error.stack,
            })
        }
        next(error)
    }
}

export const getCategories = async (_: Request, __: Response, next: NextFunction) => {
    try {
        next(new ResponseHandler(201, await GetCategories()))
    } catch (error) {
        if (error instanceof Error) {
            logger.crit({
                level: 'crit',
                file,
                message: `${error.message}`,
                stack: error.stack,
            })
        }
        next(error)
    }
}

export const createCategory = async (req: Request, _: Response, next: NextFunction) => {
    try {
        interface BodyInterface {
            name: string
            description?: string
            categoryId?: number
        }
        const { name, description, categoryId }: BodyInterface = req.body

        next(new ResponseHandler(201, await CreateCategory(name, description, categoryId)))
    } catch (error) {
        if (error instanceof Error) {
            logger.crit({
                level: 'crit',
                file,
                message: `${error.message}`,
                stack: error.stack,
            })
        }
        next(error)
    }
}

export const updateCategory = async (req: Request, _: Response, next: NextFunction) => {
    try {
        interface ParamInterface {
            id?: number
        }
        const { id }: ParamInterface = req.params
        if (!id) throw new ErrorHandler(400, messages.PARAMS_ERROR)

        interface BodyInterface {
            name?: string
            description?: string
            categoryId?: number
        }
        const { name, description, categoryId }: BodyInterface = req.body

        next(new ResponseHandler(201, await UpdateCategory(id, name, description, categoryId)))
    } catch (error) {
        if (error instanceof Error) {
            logger.crit({
                level: 'crit',
                file,
                message: `${error.message}`,
                stack: error.stack,
            })
        }
        next(error)
    }
}

export const deleteCategory = async (req: Request, _: Response, next: NextFunction) => {
    try {
        interface ParamInterface {
            id?: number
        }
        const { id }: ParamInterface = req.params
        if (!id) throw new ErrorHandler(400, messages.PARAMS_ERROR)

        next(new ResponseHandler(201, await DeleteCategory(id)))
    } catch (error) {
        if (error instanceof Error) {
            logger.crit({
                level: 'crit',
                file,
                message: `${error.message}`,
                stack: error.stack,
            })
        }
        next(error)
    }
}

export const getProduct = async (req: Request, _: Response, next: NextFunction) => {
    try {
        interface ParamInterface {
            id?: number
        }
        const { id }: ParamInterface = req.params
        if (!id) throw new ErrorHandler(400, messages.PARAMS_ERROR)

        next(new ResponseHandler(201, await GetProduct(id)))
    } catch (error) {
        if (error instanceof Error) {
            logger.crit({
                level: 'crit',
                file,
                message: `${error.message}`,
                stack: error.stack,
            })
        }
        next(error)
    }
}

export const getProducts = async (_: Request, __: Response, next: NextFunction) => {
    try {
        next(new ResponseHandler(201, await GetProducts()))
    } catch (error) {
        if (error instanceof Error) {
            logger.crit({
                level: 'crit',
                file,
                message: `${error.message}`,
                stack: error.stack,
            })
        }
        next(error)
    }
}

export const createProduct = async (req: Request, _: Response, next: NextFunction) => {
    try {
        interface BodyInterface {
            price: number
            name: string
            description?: string
            image?: string
            unit?: string
            type?: string
            categoryId: number
        }
        const { price, name, description, image, categoryId }: BodyInterface = req.body

        next(new ResponseHandler(201, await CreateProduct(price, name, categoryId, description, image)))
    } catch (error) {
        if (error instanceof Error) {
            logger.crit({
                level: 'crit',
                file,
                message: `${error.message}`,
                stack: error.stack,
            })
        }
        next(error)
    }
}

export const updateProduct = async (req: Request, _: Response, next: NextFunction) => {
    try {
        interface ParamInterface {
            id?: number
        }
        const { id }: ParamInterface = req.params
        if (!id) throw new ErrorHandler(400, messages.PARAMS_ERROR)

        interface BodyInterface {
            price: number
            name: string
            description?: string
            image?: string
            unit?: string
            type?: string
            categoryId: number
        }
        const { price, name, description, image, categoryId }: BodyInterface = req.body

        next(new ResponseHandler(201, await UpdateProduct(id, price, name, categoryId, description, image)))
    } catch (error) {
        if (error instanceof Error) {
            logger.crit({
                level: 'crit',
                file,
                message: `${error.message}`,
                stack: error.stack,
            })
        }
        next(error)
    }
}

export const deleteProduct = async (req: Request, _: Response, next: NextFunction) => {
    try {
        interface ParamInterface {
            id?: number
        }
        const { id }: ParamInterface = req.params
        if (!id) throw new ErrorHandler(400, messages.PARAMS_ERROR)

        next(new ResponseHandler(201, await DeleteProduct(id)))
    } catch (error) {
        if (error instanceof Error) {
            logger.crit({
                level: 'crit',
                file,
                message: `${error.message}`,
                stack: error.stack,
            })
        }
        next(error)
    }
}
