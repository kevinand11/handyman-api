import { BaseEntity } from 'equipped'
import { NextOfKin, VerificationIdentificationType } from '../types'

export class VerificationEntity extends BaseEntity {
	public readonly id: string
	public readonly userId: string
	public readonly identityType: VerificationIdentificationType
	public readonly nextOfKin: NextOfKin
	public readonly pending: boolean
	public readonly accepted: boolean
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, userId, identityType, nextOfKin, pending, accepted, createdAt, updatedAt }: VerificationConstructorArgs) {
		super()
		this.id = id
		this.userId = userId
		this.identityType = identityType
		this.nextOfKin = nextOfKin
		this.pending = pending
		this.accepted = accepted
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type VerificationConstructorArgs = {
	id: string
	userId: string
	identityType: VerificationIdentificationType
	nextOfKin: NextOfKin
	pending: boolean
	accepted: boolean
	createdAt: number
	updatedAt: number
}