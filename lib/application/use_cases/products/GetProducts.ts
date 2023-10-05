import { ProductRepository } from '../../../domain/repositories'
import { ProductStorage } from '../../../interfaces/storage/mysql'

const productRepository = new ProductRepository(new ProductStorage())

/**
 * Get product
 *
 * @author camilo.ordonez
 *
 */
export default async () => {
    // Validate if the product is exists
    const products = await productRepository.getAll()

    return products.map((product) => {
        const { activeRow, createdAt, updatedAt, ...data } = product
        return data
    })
}
