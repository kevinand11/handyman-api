import { AuthRoles, AuthTypes, Enum, MediaOutput } from 'equipped'
import { AuthUserType, Phone } from '../../domain/types'

export interface UserFromModel extends UserToModel {
	_id: string
	roles: AuthRoles
	signedUpAt: number
	lastSignedInAt: number
}

export interface UserToModel {
	type: AuthUserType
	email: string
	password: string
	description: string
	name: { first: string, last: string }
	photo: MediaOutput | null
	phone: Phone
	isEmailVerified: boolean
	isPhoneVerified: boolean
	authTypes: Enum<typeof AuthTypes>[]
}