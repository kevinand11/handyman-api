import { VerificationsController } from '@application/controllers/users/verifications'
import { isAdmin, isAuthenticated, isHandyman } from '@application/middlewares'
import { groupRoutes, makeController, StatusCodes } from 'equipped'

export const verificationsRoutes = groupRoutes('/verifications', [
	{
		path: '/',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await VerificationsController.get(req)
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
					result: await VerificationsController.find(req)
				}
			})
		]
	}, {
		path: '/',
		method: 'post',
		controllers: [
			isHandyman,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await VerificationsController.create(req)
				}
			})
		]
	}, {
		path: '/:id/accept',
		method: 'put',
		controllers: [
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await VerificationsController.accept(req)
				}
			})
		]
	}
])