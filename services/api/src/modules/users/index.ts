import { UserRepository } from './data/repositories/users'
import { VerificationRepository } from './data/repositories/verifications'
import { UsersUseCase } from './domain/useCases/users'
import { VerificationsUseCase } from './domain/useCases/verifications'

const userRepository = UserRepository.getInstance()
const verificationRepository = VerificationRepository.getInstance()

export const UsersUseCases = new UsersUseCase(userRepository)
export const VerificationsUseCases = new VerificationsUseCase(verificationRepository)

export { generateDefaultUser } from './domain/entities/users'
export { EmbeddedUser, UserMeta, VerificationIdentificationType } from './domain/types'
