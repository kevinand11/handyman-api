export enum NotificationType {
	VerificationAccepted = 'VerificationAccepted',
	VerificationRejected = 'VerificationRejected'
}

export type NotificationData = { type: NotificationType.VerificationAccepted, verificationId: string }
	| { type: NotificationType.VerificationRejected, verificationId: string }