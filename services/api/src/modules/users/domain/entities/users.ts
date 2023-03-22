import { AuthUserType } from '@modules/auth'
import { BaseEntity, Validation } from 'equipped'
import { EmbeddedUser, UserBio, UserDates, UserLocation, UserMetaType, UserRatings, UserRoles, UserStatus } from '../types'

export class UserEntity extends BaseEntity {
	public readonly id: string
	public readonly bio: UserBio
	public readonly roles: UserRoles
	public readonly dates: UserDates
	public readonly status: UserStatus
	public readonly meta: UserMetaType
	public readonly location: UserLocation | null
	public readonly ratings: UserRatings

	constructor ({ id, bio, roles, dates, status, meta, location, ratings }: UserConstructorArgs) {
		super()
		this.id = id
		this.bio = generateDefaultBio(bio ?? {})
		this.roles = generateDefaultRoles(roles ?? {})
		this.dates = dates
		this.status = status
		this.meta = meta
		this.location = location
		this.ratings = ratings
	}

	isDeleted () {
		return this.dates.deletedAt !== null
	}

	getEmbedded (): EmbeddedUser {
		return {
			id: this.id,
			bio: { name: this.bio.name, photo: this.bio.photo, type: this.bio.type },
			roles: this.roles
		}
	}
}

type UserConstructorArgs = {
	id: string
	bio: UserBio
	roles: UserRoles
	dates: UserDates
	status: UserStatus
	meta: UserMetaType
	location: UserLocation | null
	ratings: UserRatings
}

const generateDefaultBio = (bio: Partial<UserBio>): UserBio => {
	const type = bio?.type ?? AuthUserType.user
	const first = Validation.capitalize(bio?.name?.first ?? 'Anon')
	const last = Validation.capitalize(bio?.name?.last ?? 'Ymous')
	const full = Validation.capitalize(bio?.name?.full ?? (first + ' ' + last))
	const email = bio?.email ?? 'anon@ymous.com'
	const description = bio?.description ?? ''
	const photo = bio?.photo ?? null
	const phone = bio?.phone ?? null
	return { type, name: { first, last, full }, email, description, photo, phone }
}

const generateDefaultRoles = (roles: Partial<UserRoles>): UserRoles => {
	return roles ?? {}
}

export const generateDefaultUser = (user: Partial<EmbeddedUser>): EmbeddedUser => {
	const id = user?.id ?? ''
	const bio = generateDefaultBio(user?.bio ?? {})
	const roles = generateDefaultRoles(user?.roles ?? {})
	return {
		id,
		bio: { name: bio.name, photo: bio.photo, type: bio.type },
		roles
	}
}