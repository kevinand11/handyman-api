import { groupRoutes } from 'equipped'
import { chatRoutes } from './chats'
import { chatMetaRoutes } from './chatMetas'

export const messagingRoutes = groupRoutes('/messaging', [
	...chatMetaRoutes,
	...chatRoutes
])