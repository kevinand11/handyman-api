import { appInstance } from '@utils/types'
import { OnJoinFn } from 'equipped'

export const registerSockets = () => {
	// const isAdmin: OnJoinFn = async ({ channel, user }) => user?.roles?.[AuthRole.isAdmin] ? channel : null
	const isMine: OnJoinFn = async ({ channel, user }) => user ? `${channel}/${user.id}` : null
	const isOpen: OnJoinFn = async ({ channel }) => channel

	appInstance.listener
		.register('interactions/comments', isOpen)
		.register('interactions/likes', isOpen)
		.register('interactions/tags', isOpen)
		.register('interactions/views', isOpen)

		.register('notifications/notifications', isMine)

		.register('payment/methods', isMine)
		.register('payment/transactions', isMine)
		.register('payment/wallets', isMine)

		.register('users/users', isOpen)
}