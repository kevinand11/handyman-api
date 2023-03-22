import { UsersController } from '@application/controllers/users/users'
import { groupRoutes, makeController, StatusCodes } from 'equipped'

export const usersRoutes = groupRoutes('/users', [
	{
		path: '/',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await UsersController.get(req)
				}
			})
		]
	}, {
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
	}
])