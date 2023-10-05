import { CategoryRepository } from '../../../domain/repositories'
import { CategoryStorage } from '../../../interfaces/storage/mysql'
import { CategoryEntity } from '../../../domain/entities'

const categoryRepository = new CategoryRepository(new CategoryStorage())

/**
 * Get category
 *
 * @author camilo.ordonez
 *
 */
export default async () => {
    // Validate if the category is exists
    const categories = await categoryRepository.getAll()

    // control structures to assemble the response object
    const referents = new Map()
    const dataCategories = new Map()
    const categoryIdsParents: number[] = []

    categories.forEach((category) => {
        if (category instanceof CategoryEntity) {
            if (referents.has(category.categoryId)) {
                // valid if there is a reference to the parent category

                // productCategoryId is added to the parent's reference
                referents.set(category.categoryId, [...referents.get(category.categoryId), category.productCategoryId])
            } else if (category.categoryId) {
                //valid that has an associated parent category

                // productCategoryId will be created to the parent reference
                referents.set(category.categoryId, [category.productCategoryId])
            } else if (!referents.has(category.productCategoryId)) {
                // validates whether productCategoryId has a reference to

                referents.set(category.productCategoryId, [])
                categoryIdsParents.push(Number(category.productCategoryId))
            }

            // the information is stored with the key productCategoryId
            if (!dataCategories.has(category.productCategoryId)) {
                const { activeRow, createdAt, updatedAt, ...data } = category
                dataCategories.set(category.productCategoryId, data)
            }
        }
    })

    const data = categoryIdsParents.map((categoryId) => {
        interface DataReturn extends CategoryEntity {
            subCategories: CategoryEntity[]
        }
        const extractInfo = (idFather: number, idSons: number[]): DataReturn => {
            let subCategories: DataReturn[] = []
            if (idSons && idSons.length > 0) {
                subCategories = idSons.map((id) => {
                    return extractInfo(id, referents.get(id))
                })
            }
            return { ...dataCategories.get(idFather), subCategories }
        }

        return extractInfo(categoryId, referents.get(categoryId))
    })

    return data
}
