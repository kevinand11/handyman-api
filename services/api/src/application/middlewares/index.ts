import { AuthUserType } from '@modules/auth'
import {
	AuthRole,
	makeMiddleware,
	NotAuthenticatedError,
	NotAuthorizedError,
	requireAuthUser,
	requireRefreshUser
} from 'equipped'

export const isAuthenticatedButIgnoreVerified = makeMiddleware(
	async (request) => {
		await requireAuthUser(request)
	}
)

export const isAuthenticated = makeMiddleware(
	async (request) => {
		await requireAuthUser(request)
		if (!request.authUser?.isEmailVerified) throw new NotAuthenticatedError('verify your email address to proceed')
		if (!request.authUser?.isPhoneVerified) throw new NotAuthenticatedError('verify your phone number to proceed')
	}
)

export const hasRefreshToken = makeMiddleware(
	async (request) => {
		await requireRefreshUser(request)
	}
)

export const isHandyman = makeMiddleware(
	async (request) => {
		const isHandyman = request.authUser?.type === AuthUserType.handyman
		if (!request.authUser) throw new NotAuthenticatedError()
		if (!isHandyman) throw new NotAuthorizedError()
	}
)

export const isAdmin = makeMiddleware(
	async (request) => {
		const isAdmin = request.authUser?.roles?.[AuthRole.isAdmin] || request.authUser?.roles?.[AuthRole.isSuperAdmin]
		if (!request.authUser) throw new NotAuthenticatedError()
		if (!isAdmin) throw new NotAuthorizedError()
	}
)