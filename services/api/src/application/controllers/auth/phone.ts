import { AuthUseCases, AuthUsersUseCases, generateAuthOutput } from '@modules/auth'
import { BadRequestError, Request, Schema, validate } from 'equipped'

export class PhoneController {
	static async sendVerificationText (req: Request) {
		const user = await AuthUsersUseCases.findUser(req.authUser!.id)
		if (!user) throw new BadRequestError('profile not found')
		return await AuthUseCases.sendVerificationText({ id: user.id, phone: user.phone })
	}

	static async verifyPhone (req: Request) {
		const { token } = validate({
			token: Schema.force.string()
		}, req.body)

		const data = await AuthUseCases.verifyPhone(token)
		return await generateAuthOutput(data)
	}
}