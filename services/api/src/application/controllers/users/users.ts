import { UsersUseCases } from '@modules/users'
import { QueryParams, Request, Schema, validate, Validation } from 'equipped'

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

	static async updateLocation (req: Request) {
		const { coords } = validate({
			coords: Schema.tuple([Schema.number(), Schema.number()]),
		}, req.body)
		const hash = Validation.Geohash.encode(coords)
		const user = await UsersUseCases.updateLocation({
			userId: req.authUser!.id,
			location: { coords, hash }
		})
		if (user?.isDeleted()) return null
		return user
	}
}