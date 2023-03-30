import { AuthUseCases, AuthUsersUseCases, AuthUserType, generateAuthOutput, Phone } from '@modules/auth'
import { UploaderUseCases } from '@modules/storage'
import { AuthTypes, BadRequestError, Request, Schema, validate, Validation } from 'equipped'

export class EmailsController {
	static async signup (req: Request) {
		const userCredential: Record<string, any> = {
			...req.body,
			photo: req.files.photo?.at(0) ?? null
		}

		const user = await AuthUsersUseCases.findUserByEmail(userCredential.email)

		const { type, email, name, description, password, phone, photo: userPhoto } = validate({
			type: Schema.in(Object.values(AuthUserType)),
			email: Schema.string().email().addRule((value) => {
				const email = value as string
				if (!user) return Validation.isValid(email)
				if (user.authTypes.includes(AuthTypes.email)) return Validation.isInvalid(['this email already exists with a password attached'], email)
				if (user.authTypes.includes(AuthTypes.google)) return Validation.isInvalid(['this email is associated with a google account. Try signing in with google'], email)
				return Validation.isInvalid(['email already in use'], email)
			}),
			password: Schema.string().min(8).max(16),
			phone: Schema.any<Phone>().addRule(Validation.isValidPhone()),
			description: Schema.string(),
			photo: Schema.file().image().nullable(),
			name: Schema.object({
				first: Schema.string().min(1),
				last: Schema.string().min(1),
			})
		}, userCredential)

		const photo = userPhoto ? await UploaderUseCases.upload('profiles/photos', userPhoto) : null
		const validateData = { type, name, email, password, photo, description, phone }

		const updatedUser = user
			? await AuthUsersUseCases.updateUserDetails({ userId: user.id, data: validateData })
			: await AuthUseCases.registerUser(validateData)

		return await generateAuthOutput(updatedUser)
	}

	static async signin (req: Request) {
		const validateData = validate({
			email: Schema.string().email(),
			password: Schema.string(),
		}, req.body)

		const data = await AuthUseCases.authenticateUser(validateData)
		return await generateAuthOutput(data)
	}

	static async sendVerificationMail (req: Request) {
		const user = await AuthUsersUseCases.findUser(req.authUser!.id)
		if (!user) throw new BadRequestError('profile not found')
		return await AuthUseCases.sendVerificationMail(user.email)
	}

	static async verifyEmail (req: Request) {
		const { token } = validate({
			token: Schema.force.string()
		}, req.body)

		const data = await AuthUseCases.verifyEmail(token)
		return await generateAuthOutput(data)
	}
}