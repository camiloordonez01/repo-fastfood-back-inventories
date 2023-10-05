import messages from '../../../../messages'

import { ErrorHandler } from '../../../shared/infrastructure/handler'

import { ProductRepository } from '../../../domain/repositories'
import { ProductStorage } from '../../../interfaces/storage/mysql'

const productRepository = new ProductRepository(new ProductStorage())

/**
 * Update a product
 *
 * @author camilo.ordonez
 *
 */
export default async (
    id: number,
    price: number,
    name: string,
    categoryId: number,
    image?: string,
    description?: string
) => {
    // Validate if the product is exists
    const product = await productRepository.getById(id)
    if (!product) throw new ErrorHandler(400, messages.PRODUCT_NOT_FOUND)

    if (name) {
        // Validate if the product name is already in use
        const findProductByName = await productRepository.getByName(name)
        if (findProductByName) throw new ErrorHandler(400, messages.EXISTING_PRODUCT)
    }

    product.name = name ?? product.name
    product.price = price ?? product.price
    product.image = image ?? product.image
    product.description = description ?? product.description
    product.categoryId = categoryId ?? product.categoryId

    await productRepository.update(id, product)

    const { activeRow, createdAt, updatedAt, ...data } = product
    return data
}
