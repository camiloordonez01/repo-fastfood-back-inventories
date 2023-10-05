import messages from '../../../../messages'

import { ErrorHandler } from '../../../shared/infrastructure/handler'

import { CategoryRepository } from '../../../domain/repositories'
import { CategoryStorage } from '../../../interfaces/storage/mysql'

const categoryRepository = new CategoryRepository(new CategoryStorage())

/**
 * Delete a category
 *
 * @author camilo.ordonez
 *
 */
export default async (id: number) => {
    // Validate if the category is exists
    const category = await categoryRepository.getById(id)
    if (!category) throw new ErrorHandler(400, messages.CATEGORY_NOT_FOUND)

    const dependencies = await categoryRepository.getByForeignKey(id)
    if (dependencies.length > 0) throw new ErrorHandler(400, messages.CATEGORY_DEPENDENCIES)

    category.activeRow = '0'

    await categoryRepository.update(id, category)

    const { activeRow, createdAt, updatedAt, ...data } = category
    return data
}
