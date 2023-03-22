import { appInstance } from '@utils/types'
import { DbChangeCallbacks } from 'equipped'
import { ChatMetaFromModel } from '../../data/models/chatMetas'
import { ChatMetaEntity } from '../../domain/entities/chatMetas'

export const ChatMetaDbChangeCallbacks: DbChangeCallbacks<ChatMetaFromModel, ChatMetaEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created([
			...(after.members.map((userId) => `messaging/chatMetas/${userId}`)),
			...(after.members.map((userId) => `messaging/chatMetas/${after.id}/${userId}`)),
		], after)
	},
	updated: async ({ after }) => {
		await appInstance.listener.created([
			...(after.members.map((userId) => `messaging/chatMetas/${userId}`)),
			...(after.members.map((userId) => `messaging/chatMetas/${after.id}/${userId}`)),
		], after)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.created([
			...(before.members.map((userId) => `messaging/chatMetas/${userId}`)),
			...(before.members.map((userId) => `messaging/chatMetas/${before.id}/${userId}`)),
		], before)
	}
}