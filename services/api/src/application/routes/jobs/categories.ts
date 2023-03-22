import { CategoryController } from '@application/controllers/jobs/categories'
import { isAdmin } from '@application/middlewares'
import { groupRoutes, makeController, StatusCodes } from 'equipped'

export const categoriesRoutes = groupRoutes('/categories', [
	{
		path: '/',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CategoryController.get(req)
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
					result: await CategoryController.find(req)
				}
			})
		]
	}, {
		path: '/:id',
		method: 'put',
		controllers: [
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CategoryController.update(req)
				}
			})
		]
	}, {
		path: '/',
		method: 'post',
		controllers: [
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CategoryController.create(req)
				}
			})
		]
	}, {
		path: '/:id',
		method: 'delete',
		controllers: [
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await CategoryController.delete(req)
				}
			})
		]
	}
])