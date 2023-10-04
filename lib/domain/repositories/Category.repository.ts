import { CategoryStorage } from '../../interfaces/storage/mysql'
import Repository from '../../shared/domain/repositories/Repository'

class CategoryRepository extends Repository {
    protected storage: CategoryStorage
    constructor(categoryStorage: CategoryStorage) {
        super(categoryStorage)
        this.storage = categoryStorage
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

    getByForeignKey(id: number) {
        return this.storage.getByForeignKey(id)
    }
}

export default CategoryRepository
