import { CategoryRepository } from './data/repositories/categories'
import { ReviewRepository } from './data/repositories/reviews'
import { CategoriesUseCase } from './domain/useCases/categories'
import { ReviewsUseCase } from './domain/useCases/reviews'

const categoryRepository = CategoryRepository.getInstance()
const reviewRepository = ReviewRepository.getInstance()

export const CategoriesUseCases = new CategoriesUseCase(categoryRepository)
export const ReviewsUseCases = new ReviewsUseCase(reviewRepository)