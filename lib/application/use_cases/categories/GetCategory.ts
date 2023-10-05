import messages from '../../../../messages'

import { ErrorHandler } from '../../../shared/infrastructure/handler'

import { CategoryRepository } from '../../../domain/repositories'
import { CategoryStorage } from '../../../interfaces/storage/mysql'

const categoryRepository = new CategoryRepository(new CategoryStorage())

/**
 * Get category
 *
 * @author camilo.ordonez
 *
 */
export default async (id: number) => {
    // Validate if the category is exists
    const category = await categoryRepository.getById(id)
    if (!category) throw new ErrorHandler(400, messages.CATEGORY_NOT_FOUND)

    const { activeRow, createdAt, updatedAt, ...data } = category
    return data
}
