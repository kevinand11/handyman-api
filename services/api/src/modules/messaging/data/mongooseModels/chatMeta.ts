import { appInstance } from '@utils/types'
import { ChatMetaDbChangeCallbacks } from '../../utils/changes/chatMetas'
import { ChatMetaMapper } from '../mappers/chatMetas'
import { ChatMetaFromModel } from '../models/chatMetas'

const Schema = new appInstance.dbs.mongo.Schema<ChatMetaFromModel>({
	_id: {
		type: String,
		default: () => appInstance.dbs.mongo.Id.toString()
	},
	readAt: {
		type: appInstance.dbs.mongo.Schema.Types.Mixed,
		required: false,
		default: {}
	},
	last: {
		type: appInstance.dbs.mongo.Schema.Types.Mixed,
		required: false,
		default: null
	},
	members: {
		type: [String],
		required: true
	},
	createdAt: {
		type: Number,
		required: false,
		default: Date.now
	},
	updatedAt: {
		type: Number,
		required: false,
		default: Date.now
	}
}, { timestamps: { currentTime: Date.now }, minimize: false })

export const ChatMeta = appInstance.dbs.mongo.use().model<ChatMetaFromModel>('MessagingChatMeta', Schema)

export const ChatMetaChange = appInstance.dbs.mongo.change(ChatMeta, ChatMetaDbChangeCallbacks, new ChatMetaMapper().mapFrom)