import StorageMysql from '../../../shared/interfaces/storage/StorageMysql'

import { ProductModel } from '../../../infrastructure/database/models/typeorm'
import { ProductEntity } from '../../../domain/entities'

class ProductStorage extends StorageMysql {
    constructor() {
        super(ProductModel)
    }

    async getAll() {
        const products = await this.repository.findBy({ activeRow: '1' })

        return products.length > 0 ? products.map((product) => new ProductEntity(product as ProductEntity)) : products
    }

    async getByName(name: string) {
        const product = await this.repository.findOneBy({ name, activeRow: '1' })

        return product ? new ProductEntity(product as ProductEntity) : product
    }

    async getById(productId: number) {
        const product = await this.repository.findOneBy({ productId, activeRow: '1' })

        return product ? new ProductEntity(product as ProductEntity) : product
    }
}

export default ProductStorage
