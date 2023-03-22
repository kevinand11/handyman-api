import { BaseMapper } from 'equipped'
import { ChatEntity } from '../../domain/entities/chats'
import { ChatFromModel, ChatToModel } from '../models/chats'

export class ChatMapper extends BaseMapper<ChatFromModel, ChatToModel, ChatEntity> {
	mapFrom (model: ChatFromModel | null) {
		if (!model) return null
		const { _id, from, to, body, media, readAt, createdAt, updatedAt } = model
		return new ChatEntity({
			id: _id.toString(), from, to,
			body, media,
			createdAt, updatedAt, readAt
		})
	}

	mapTo (entity: ChatEntity) {
		return {
			body: entity.body,
			from: entity.from,
			to: entity.to,
			media: entity.media
		}
	}
}
