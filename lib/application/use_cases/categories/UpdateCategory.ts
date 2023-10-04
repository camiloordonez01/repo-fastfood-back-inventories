import messages from '../../../../messages'

import { ErrorHandler } from '../../../shared/infrastructure/handler'

import { CategoryRepository } from '../../../domain/repositories'
import { CategoryStorage } from '../../../interfaces/storage/mysql'

const categoryRepository = new CategoryRepository(new CategoryStorage)

/**
 * Update a category
 *
 * @author camilo.ordonez
 *
 */
export default async (id: number, name?: string, description?: string, categoryId?: number) => {
    // Validate if the category is exists
    const category = await categoryRepository.getById(id)
    if (!category) throw new ErrorHandler(400, messages.CATEGORY_NOT_FOUND)

    if (name) {
        // Validate if the category name is already in use
        const findCategoryByName = await categoryRepository.getByName(name)
        if (findCategoryByName) throw new ErrorHandler(400, messages.EXISTING_CATEGORY)
    }

    category.name = name ?? category.name
    category.description = description ?? category.description
    category.categoryId = categoryId ?? category.categoryId

    await categoryRepository.update(id, category)

    const { activeRow, createdAt, updatedAt, ...data} = category
    return data
}
