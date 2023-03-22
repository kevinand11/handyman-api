import { UserRepository } from './data/repositories/users'
import { UsersUseCase } from './domain/useCases/users'

const userRepository = UserRepository.getInstance()

export const UsersUseCases = new UsersUseCase(userRepository)

export { generateDefaultUser } from './domain/entities/users'
export { EmbeddedUser, UserMeta } from './domain/types'
