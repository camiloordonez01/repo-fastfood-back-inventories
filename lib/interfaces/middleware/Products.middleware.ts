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
