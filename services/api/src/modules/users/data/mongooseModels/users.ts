import { appInstance } from '@utils/types'
import { UserMeta } from '../../domain/types'
import { UserDbChangeCallbacks } from '../../utils/changes/users'
import { UserMapper } from '../mappers/users'
import { UserFromModel } from '../models/users'

const Meta = Object.fromEntries(
	Object.keys(UserMeta).map((key) => [key, {
		type: Number,
		required: false,
		default: 0
	}])
)

const UserSchema = new appInstance.dbs.mongo.Schema<UserFromModel>({
	_id: {
		type: String,
		default: () => appInstance.dbs.mongo.Id.toString()
	},
	bio: {
		type: appInstance.dbs.mongo.Schema.Types.Mixed,
		required: true
	},
	roles: {
		type: appInstance.dbs.mongo.Schema.Types.Mixed,
		required: false,
		default: {}
	},
	dates: {
		createdAt: {
			type: Number,
			required: false,
			default: Date.now
		},
		deletedAt: {
			type: Number,
			required: false,
			default: null
		}
	},
	status: {
		connections: {
			type: [String],
			required: false,
			default: []
		},
		lastUpdatedAt: {
			type: Number,
			required: false,
			default: 0
		}
	},
	location: {
		type: appInstance.dbs.mongo.Schema.Types.Mixed,
		required: false,
		default: null
	},
	meta: Meta
}, { minimize: false })

export const User = appInstance.dbs.mongo.use().model<UserFromModel>('User', UserSchema)

export const UserChange = appInstance.dbs.mongo.change(User, UserDbChangeCallbacks, new UserMapper().mapFrom)