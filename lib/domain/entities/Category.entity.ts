import Entity from '../../shared/domain/entities/Entity'

class CategoryEntity extends Entity {
    productCategoryId?: number
    name: string
    description?: string
    categoryId?: number

    constructor(categoryEntity: CategoryEntity) {
        super(categoryEntity)
        this.productCategoryId = categoryEntity.productCategoryId
        this.name = categoryEntity.name
        this.description = categoryEntity.description
        this.categoryId = categoryEntity.categoryId
    }
}

export default CategoryEntity
