import { LocalUploaderRepository } from './data/repositories/localUploader'
import { UploaderUseCase } from './domain/useCases/uploader'

const uploaderRepository = new LocalUploaderRepository()

export const UploaderUseCases = new UploaderUseCase(uploaderRepository)