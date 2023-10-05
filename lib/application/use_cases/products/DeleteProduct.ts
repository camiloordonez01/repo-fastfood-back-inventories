import messages from '../../../../messages'

import { ErrorHandler } from '../../../shared/infrastructure/handler'

import { ProductRepository } from '../../../domain/repositories'
import { ProductStorage } from '../../../interfaces/storage/mysql'

const productRepository = new ProductRepository(new ProductStorage())

/**
 * Delete a product
 *
 * @author camilo.ordonez
 *
 */
export default async (id: number) => {
    // Validate if the product is exists
    const product = await productRepository.getById(id)
    if (!product) throw new ErrorHandler(400, messages.PRODUCT_NOT_FOUND)

    product.activeRow = '0'

    await productRepository.update(id, product)

    const { activeRow, createdAt, updatedAt, ...data } = product
    return data
}
