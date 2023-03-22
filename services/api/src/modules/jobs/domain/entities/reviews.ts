import { generateDefaultUser } from '@modules/users'
import { BaseEntity } from 'equipped'
import { EmbeddedUser } from '../types'

export class ReviewEntity extends BaseEntity {
	public readonly id: string
	public readonly jobId: string
	public readonly to: string
	public readonly user: EmbeddedUser
	public readonly rating: number
	public readonly message: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		id, jobId, to, user, rating, message, createdAt, updatedAt
	}: ReviewConstructorArgs) {
		super()
		this.id = id
		this.jobId = jobId
		this.to = to
		this.user = generateDefaultUser(user)
		this.rating = rating
		this.message = message
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type ReviewConstructorArgs = {
	id: string
	jobId: string
	to: string
	user: EmbeddedUser
	rating: number
	message: string
	createdAt: number
	updatedAt: number
}