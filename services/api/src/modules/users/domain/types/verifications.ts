import { Phone } from '@modules/auth'

export enum VerificationIdentificationType {
	nin = 'nin',
	driverLicense = 'driverLicense',
	voterCard = 'voterCard'
}

export type NextOfKin = {
	name: string
	phone: Phone
}