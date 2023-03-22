import { BaseMapper } from 'equipped'
import { ChatMetaEntity } from '../../domain/entities/chatMetas'
import { ChatMetaFromModel, ChatMetaToModel } from '../models/chatMetas'
import { ChatMapper } from './chats'

export class ChatMetaMapper extends BaseMapper<ChatMetaFromModel, ChatMetaToModel, ChatMetaEntity> {
	mapFrom (model: ChatMetaFromModel | null) {
		if (!model) return null
		const { _id, last, members, createdAt, updatedAt, readAt } = model
		const lastData = new ChatMapper().mapFrom(last)
		return new ChatMetaEntity({
			id: _id.toString(), last: lastData!, members,
			createdAt, updatedAt, readAt
		})
	}

	mapTo (entity: ChatMetaEntity) {
		return {
			members: entity.members
		}
	}
}
