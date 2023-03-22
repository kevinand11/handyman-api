import { UsersController } from '@application/controllers/users/users'
import { isAuthenticated } from '@application/middlewares'
import { groupRoutes, makeController, StatusCodes } from 'equipped'

export const usersRoutes = groupRoutes('/users', [
	{
		path: '/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await UsersController.find(req)
				}
			})
		]
	}, {
		path: '/location',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await UsersController.updateLocation(req)
				}
			})
		]
	}, {
		path: '/handymen/location',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await UsersController.getHandyMenInLocation(req)
				}
			})
		]
	}
])