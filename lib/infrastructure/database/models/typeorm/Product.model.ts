import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import Model from '../../../../shared/infrastructure/database/Model'

@Entity('tbl_products')
class ProductModel extends Model {
    @PrimaryGeneratedColumn({ name: 'product_id' })
    productId?: number

    @Column()
    price: number

    @Column()
    name: string

    @Column()
    description?: string

    @Column()
    image?: string

    @Column({ name: 'category_id' })
    categoryId: number

    constructor(
        name: string,
        price: number,
        categoryId: number,
        productId?: number,
        image?: string,
        description?: string
    ) {
        super()
        this.productId = productId
        this.name = name
        this.price = price
        this.image = image
        this.description = description
        this.categoryId = categoryId
    }
}

export default ProductModel
