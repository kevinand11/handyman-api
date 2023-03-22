import { AuthUserType } from '@modules/auth'
import { UsersUseCases } from '@modules/users'
import { AuthRole, QueryKeys, QueryParams, Request, Schema, validate, Validation } from 'equipped'

export class UsersController {
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

	static async getHandyMenInLocation (req: Request) {
		const { coords, radiusInKm } = validate({
			coords: Schema.tuple([Schema.number(), Schema.number()]),
			radiusInKm: Schema.number().default(10)
		}, { ...req.query })
		const hash = Validation.Geohash.encode(coords)
		const query = req.query as QueryParams
		const slicedHash = this.getHashSlice(hash, radiusInKm * 1000)
		query.authType = QueryKeys.and
		query.auth = [
			{ field: 'bio.type', value: AuthUserType.handyman },
			{ field: `roles.${AuthRole.isActive}`, value: true },
			{ field: 'dates.deletedAt', value: null },
			{ field: 'location.hash', value: new RegExp(`^${slicedHash}`) }
		]
		return await UsersUseCases.get(query)
	}

	private static getHashSlice (hash: string, radiusInM: number) {
		if (radiusInM < 0) return hash.slice(0, 11)
		if (radiusInM < 1) return hash.slice(0, 10)
		if (radiusInM < 5) return hash.slice(0, 9)
		if (radiusInM < 40) return hash.slice(0, 8)
		if (radiusInM < 150) return hash.slice(0, 7)
		if (radiusInM < 1200) return hash.slice(0, 6)
		if (radiusInM < 5000) return hash.slice(0, 5)
		if (radiusInM < 40000) return hash.slice(0, 4)
		if (radiusInM < 160000) return hash.slice(0, 3)
		if (radiusInM < 1200000) return hash.slice(0, 2)
		return hash
	}
}