import { Column, Entity, PrimaryGeneratedColumn,  } from 'typeorm'
import Model from '../../../../shared/infrastructure/database/Model'

@Entity('tbl_products_categories')
class ProductCategoryModel extends Model {
    @PrimaryGeneratedColumn({ name: 'product_category_id' })
    productCategoryId?: number

    @Column()
    name: string

    @Column()
    description?: string

    @Column({ name: 'category_id' })
    categoryId?: number

    constructor(
        name: string,
        productCategoryId?: number,
        categoryId?: number,
        description?: string,
    ) {
        super()
        this.productCategoryId = productCategoryId
        this.name = name
        this.description = description
        this.categoryId = categoryId
    }
}

export default ProductCategoryModel
