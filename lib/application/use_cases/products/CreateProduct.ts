import messages from '../../../../messages'

import { ErrorHandler } from '../../../shared/infrastructure/handler'

import { ProductEntity } from '../../../domain/entities'
import { ProductRepository } from '../../../domain/repositories'
import { ProductStorage } from '../../../interfaces/storage/mysql'

const productRepository = new ProductRepository(new ProductStorage())

/**
 * Create a product
 *
 * @author camilo.ordonez
 *
 */
export default async (price: number, name: string, categoryId: number, image?: string, description?: string) => {
    // Validate if the product name is already in use
    const findProductByName = await productRepository.getByName(name)
    if (findProductByName) throw new ErrorHandler(400, messages.EXISTING_PRODUCT)

    const product = new ProductEntity({ price, name, image, description, categoryId })
    await productRepository.save(product)

    const { activeRow, createdAt, updatedAt, ...data } = product
    return data
}
