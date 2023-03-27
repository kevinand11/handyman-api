import { AuthUsersUseCases, Phone } from '@modules/auth'
import { UploaderUseCases } from '@modules/storage'
import { VerificationIdentificationType, VerificationsUseCases } from '@modules/users'
import {
	BadRequestError, NotAuthorizedError,
	QueryParams,
	Request,
	Schema, validate, Validation
} from 'equipped'

export class VerificationsController {
	static async find (req: Request) {
		const verification = await VerificationsUseCases.find(req.params.id)
		if (!verification) return null
		if (verification.userId === req.authUser!.id || req.authUser?.roles.isAdmin) return verification
		return null
	}

	static async get (req: Request) {
		const query = req.query as QueryParams
		if (!req.authUser?.roles.isAdmin) query.auth = [{ field: 'userId', value: req.authUser!.id }]
		return await VerificationsUseCases.get(query)
	}

	static async create (req: Request) {
		const authUser = req.authUser!
		if (authUser.roles.isActive) throw new BadRequestError('Profile is already active')

		const { photo: userPhoto, identityType, nextOfKin } = validate({
			photo: Schema.file().image(),
			identityType: Schema.in(Object.values(VerificationIdentificationType)),
			nextOfKin: Schema.object({
				name: Schema.string(),
				phone: Schema.any<Phone>().addRule(Validation.isValidPhone()),
			}),
		}, { ...req.body, photo: req.files.photo?.at(0) ?? null })

		const photo = await UploaderUseCases.upload('profiles/photos', userPhoto)

		await AuthUsersUseCases.updateUserDetails({ userId: authUser!.id, data: { photo } as any })

		return await VerificationsUseCases.create({
			userId: authUser.id, nextOfKin, identityType,
			pending: true, accepted: false
		})
	}

	static async accept (req: Request) {
		const { accept } = validate({
			accept: Schema.boolean()
		}, req.body)
		const isUpdated = await VerificationsUseCases.accept({ id: req.params.id, accept })
		if (isUpdated) return isUpdated
		throw new NotAuthorizedError()
	}
}