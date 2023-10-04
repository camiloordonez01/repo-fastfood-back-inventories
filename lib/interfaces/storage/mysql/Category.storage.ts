import StorageMysql from '../../../shared/interfaces/storage/StorageMysql'

import { ProductCategoryModel } from '../../../infrastructure/database/models/typeorm'
import { CategoryEntity } from '../../../domain/entities'

class CategoryStorage extends StorageMysql {
    constructor() {
        super(ProductCategoryModel)
    }

    async getAll() {
        const categories = await this.repository.findBy({ activeRow: '1' })

        return categories.length > 0 ? categories.map((category) => new CategoryEntity(category as CategoryEntity)) : categories
    }

    async getByName(name: string) {
        const category = await this.repository.findOneBy({ name, activeRow: '1' })

        return category ? new CategoryEntity(category as CategoryEntity) : category
    }

    async getById(productCategoryId: number) {
        const category = await this.repository.findOneBy({ productCategoryId, activeRow: '1' })

        return category ? new CategoryEntity(category as CategoryEntity) : category
    }

    
    async getByForeignKey(categoryId: number) {
        const categories = await this.repository.findBy({ categoryId })

        return categories.length > 0 ? categories.map((category) => new CategoryEntity(category as CategoryEntity)) : categories
    }
}

export default CategoryStorage
