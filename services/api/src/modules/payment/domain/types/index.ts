import { CronTypes, Enum } from 'equipped'

export enum Currencies {
	NGN = 'NGN'
}

export enum TransactionStatus {
	initialized = 'initialized',
	fulfilled = 'fulfilled',
	failed = 'failed',
	settled = 'settled'
}

export enum TransactionType {
	newCard = 'newCard',
	subscription = 'subscription'
}

export type TransactionData = {
	type: TransactionType.newCard
} | {
	type: TransactionType.subscription
	subscriptionId: string
}

export enum MethodType {
	card = 'card'
}

export type MethodData = {
	type: MethodType.card
	last4Digits: string
	country: string
	cardType: string
	expiredAt: number
	expired: boolean
}

export type Interval = Enum<typeof CronTypes>