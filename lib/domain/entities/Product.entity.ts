import Entity from '../../shared/domain/entities/Entity'

class ProductEntity extends Entity {
    productId?: number
    price: number
    name: string
    description?: string
    image?: string
    categoryId: number

    constructor(productEntity: ProductEntity) {
        super(productEntity)
        this.productId = productEntity.productId
        this.price = productEntity.price
        this.name = productEntity.name
        this.description = productEntity.description
        this.image = productEntity.image
        this.categoryId = productEntity.categoryId
    }
}

export default ProductEntity
