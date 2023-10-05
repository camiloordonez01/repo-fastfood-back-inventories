import Repository from '../../shared/domain/repositories/Repository'
import { ProductStorage } from '../../interfaces/storage/mysql'

class ProductRepository extends Repository {
    protected storage: ProductStorage
    constructor(productStorage: ProductStorage) {
        super(productStorage)
        this.storage = productStorage
    }

    getAll() {
        return this.storage.getAll()
    }

    getByName(name: string) {
        return this.storage.getByName(name)
    }

    getById(id: number) {
        return this.storage.getById(id)
    }
}

export default ProductRepository
