import { CategoryRepository } from './data/repositories/categories'
import { CategorysUseCase } from './domain/useCases/categories'

const categoryRepository = CategoryRepository.getInstance()

export const CategorysUseCases = new CategorysUseCase(categoryRepository)