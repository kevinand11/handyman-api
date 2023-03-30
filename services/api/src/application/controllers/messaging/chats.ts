import { ChatsUseCases } from '@modules/messaging'
import { UploaderUseCases } from '@modules/storage'
import { UsersUseCases } from '@modules/users'
import { BadRequestError, QueryKeys, QueryParams, Request, Schema, validate } from 'equipped'

export class ChatController {
	static async getChats (req: Request) {
		const query = req.query as QueryParams
		query.authType = QueryKeys.or
		query.auth = [
			{ field: 'from', value: req.authUser!.id },
			{ field: 'to', value: req.authUser!.id },
		]
		return await ChatsUseCases.get(query)
	}

	static async findChat (req: Request) {
		const chat = await ChatsUseCases.find(req.params.id)
		if (!chat || !chat.members().includes(req.authUser!.id)) return null
		return chat
	}

	static async addChat (req: Request) {
		const { body, media: mediaFile, to } = validate({
			body: Schema.string(),
			to: Schema.string().min(1),
			media: Schema.file().nullable()
		}, {
			...req.body, media: req.files.media?.at(0) ?? null,
		})

		const user = await UsersUseCases.find(to)
		if (!user || user.isDeleted()) throw new BadRequestError('user not found')

		const media = mediaFile ? await UploaderUseCases.upload('messaging/chats', mediaFile) : null

		return await ChatsUseCases.add({
			body, media, from: req.authUser!.id, to: user.id
		})
	}

	static async markChatRead (req: Request) {
		const data = validate({
			to: Schema.string().min(1)
		}, req.body)

		return await ChatsUseCases.markRead({
			from: req.authUser!.id, to: data.to
		})
	}
}