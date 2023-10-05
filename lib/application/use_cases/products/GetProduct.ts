import messages from '../../../../messages'

import { ErrorHandler } from '../../../shared/infrastructure/handler'

import { ProductRepository, CategoryRepository } from '../../../domain/repositories'
import { ProductStorage, CategoryStorage } from '../../../interfaces/storage/mysql'

const productRepository = new ProductRepository(new ProductStorage())
const categoryRepository = new CategoryRepository(new CategoryStorage())

/**
 * Get product
 *
 * @author camilo.ordonez
 *
 */
export default async (id: number) => {
    // Validate if the product is exists
    const product = await productRepository.getById(id)
    if (!product) throw new ErrorHandler(400, messages.PRODUCT_NOT_FOUND)

    const category = await categoryRepository.getById(product.categoryId)
    if (!category) throw new ErrorHandler(400, messages.CATEGORY_NOT_FOUND)

    const { activeRow, createdAt, updatedAt, ...data } = product
    return { ...data, categoryName: category.name }
}
