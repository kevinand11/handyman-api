import { sendPushNotification } from '@modules/notifications'
import { publishers } from '@utils/events'
import { appInstance } from '@utils/types'
import { DbChangeCallbacks } from 'equipped'
import { ChatMetasUseCases } from '../..'
import { ChatFromModel } from '../../data/models/chats'
import { ChatEntity } from '../../domain/entities/chats'

export const ChatDbChangeCallbacks: DbChangeCallbacks<ChatFromModel, ChatEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created([
			...(after.members.map((userId) => `messaging/chats/${userId}`)),
			...(after.members.map((userId) => `messaging/chats/${after.id}/${userId}`)),
		], after)
		const body = after.media ? 'Shared a file' : after.body
		await sendPushNotification({
			userIds: [after.to],
			title: 'New message', body,
			data: {
				type: 'chats',
				data: { id: after.id, to: after.to }
			}
		})
	},
	updated: async ({ after, before, changes }) => {
		await appInstance.listener.created([
			...(after.members.map((userId) => `messaging/chats/${userId}`)),
			...(after.members.map((userId) => `messaging/chats/${after.id}/${userId}`)),
		], after)
		await ChatMetasUseCases.updateLastChat({ ...after, _id: after.id, id: undefined } as any)
		if (changes.media && before.media) await publishers.DELETEFILE.publish(before.media)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.created([
			...(before.members.map((userId) => `messaging/chats/${userId}`)),
			...(before.members.map((userId) => `messaging/chats/${before.id}/${userId}`)),
		], before)
		if (before.media) await publishers.DELETEFILE.publish(before.media)
	}
}