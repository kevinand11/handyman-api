import { QueryParams } from 'equipped'
import { ChatFromModel } from '../../data/models/chats'
import { IChatMetaRepository } from '../irepositories/chatMetas'

export class ChatMetasUseCase {
	private repository: IChatMetaRepository

	constructor (repository: IChatMetaRepository) {
		this.repository = repository
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async updateLastChat (chat: ChatFromModel) {
		return await this.repository.updateLastChat(chat)
	}
}