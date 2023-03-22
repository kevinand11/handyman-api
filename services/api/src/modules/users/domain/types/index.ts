import { AuthUserType, Phone } from '@modules/auth'
import { AuthRoles, MediaOutput } from 'equipped'

export type UserBio = {
	type: AuthUserType
	email: string
	name: { first: string, last: string, full: string }
	description: string
	photo: MediaOutput | null
	phone: Phone | null
}

export type UserRoles = AuthRoles

export type UserDates = {
	createdAt: number
	deletedAt: number | null
}

export type UserStatus = {
	connections: string[]
	lastUpdatedAt: number
}

export type UserMetaType = Record<UserMeta, number>

export type EmbeddedUser = {
	id: string
	bio: Pick<UserBio, 'name' | 'photo' | 'type'>
	roles: UserRoles
}

export enum UserMeta {
	jobs = 'jobs',
	jobsHandled = 'jobsHandled'
}

export type UserLocation = {
	coords: [number, number]
	hash: string
}