import { QueryParams, QueryResults } from 'equipped'
import { ChatFromModel } from '../../data/models/chats'
import { ChatMetaEntity } from '../entities/chatMetas'

export interface IChatMetaRepository {
	find: (id: string) => Promise<ChatMetaEntity | null>
	get: (query: QueryParams) => Promise<QueryResults<ChatMetaEntity>>
	updateLastChat: (chat: ChatFromModel) => Promise<void>
}