import { UsersUseCases } from '@modules/users'
import { QueryParams, Request } from 'equipped'

export class UsersController {
	static async get (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'dates.deletedAt', value: null }]
		return await UsersUseCases.get(query)
	}

	static async find (req: Request) {
		const user = await UsersUseCases.find(req.params.id)
		if (user?.isDeleted()) return null
		return user
	}
}