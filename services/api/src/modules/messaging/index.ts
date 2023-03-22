import { ChatMetaRepository } from './data/repositories/chatMetas'
import { ChatRepository } from './data/repositories/chats'
import { ChatMetasUseCase } from './domain/useCases/chatMetas'
import { ChatsUseCase } from './domain/useCases/chats'

const chatRepository = ChatRepository.getInstance()
const chatMetaRepository = ChatMetaRepository.getInstance()

export const ChatsUseCases = new ChatsUseCase(chatRepository)
export const ChatMetasUseCases = new ChatMetasUseCase(chatMetaRepository)