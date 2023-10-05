import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

import { logger, ErrorHandler } from '../../shared/infrastructure/handler'

import { validateRequired } from '../../shared/messages'

const file = 'Products.middleware.ts'
/**
 * Validates information when creating a product category
 *
 * @author camilo.ordonez
 *
 */
export const createCategoryMiddleware = async (req: Request, _: Response, next: NextFunction) => {
    try {
        // create schema object
        const schemaBody = Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            categoryId: Joi.string(),
        })

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        }

        // validate request body against schema
        const { error } = schemaBody.validate(req.body, options)

        const messagesError: string[] = []
        error?.details.forEach((element) => {
            switch (element.context?.key) {
                case 'name':
                    if (element.type === 'any.required') {
                        messagesError.push(validateRequired('Nombre de categoria'))
                    }
                    break
            }
        })

        if (messagesError.length > 0) {
            // on fail return comma separated errors
            throw new ErrorHandler(400, messagesError[0])
        }
        next()
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

/**
 * Validates information when creating a product
 *
 * @author camilo.ordonez
 *
 */
export const createProductMiddleware = async (req: Request, _: Response, next: NextFunction) => {
    try {
        // create schema object
        const schemaBody = Joi.object({
            price: Joi.number().required(),
            name: Joi.string().required(),
            description: Joi.string(),
            image: Joi.string(),
            categoryId: Joi.number().required(),
        })

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        }

        // validate request body against schema
        const { error } = schemaBody.validate(req.body, options)

        const messagesError: string[] = []
        error?.details.forEach((element) => {
            switch (element.context?.key) {
                case 'price':
                    if (element.type === 'any.required') {
                        messagesError.push(validateRequired('Precio del producto'))
                    }
                    break
                case 'name':
                    if (element.type === 'any.required') {
                        messagesError.push(validateRequired('Nombre del producto'))
                    }
                    break
                case 'categoryId':
                    if (element.type === 'any.required') {
                        messagesError.push(validateRequired('La categoria del producto'))
                    }
                    break
            }
        })

        if (messagesError.length > 0) {
            // on fail return comma separated errors
            throw new ErrorHandler(400, messagesError[0])
        }
        next()
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
