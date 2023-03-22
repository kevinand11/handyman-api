import { ChatMetaController } from '@application/controllers/messaging/chatMetas'
import { isAuthenticated } from '@application/middlewares'
import { groupRoutes, makeController, StatusCodes } from 'equipped'

export const chatMetaRoutes = groupRoutes('/chatMetas', [
	{
		path: '/',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ChatMetaController.getChatMeta(req)
				}
			})
		]
	}, {
		path: '/:id',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ChatMetaController.findChatMeta(req)
				}
			})
		]
	}
])