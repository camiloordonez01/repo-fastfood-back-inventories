import messages from '../../../../messages'

import { ErrorHandler } from '../../../shared/infrastructure/handler'

import { CategoryEntity } from '../../../domain/entities'
import { CategoryRepository } from '../../../domain/repositories'
import { CategoryStorage } from '../../../interfaces/storage/mysql'

const categoryRepository = new CategoryRepository(new CategoryStorage())

/**
 * Create a category
 *
 * @author camilo.ordonez
 *
 */
export default async (name: string, description?: string, categoryId?: number) => {
    // Validate if the category name is already in use
    const findCategoryByName = await categoryRepository.getByName(name)
    if (findCategoryByName) throw new ErrorHandler(400, messages.EXISTING_CATEGORY)

    const category = new CategoryEntity({ name, description, categoryId })
    await categoryRepository.save(category)

    const { activeRow, createdAt, updatedAt, ...data } = category
    return data
}
