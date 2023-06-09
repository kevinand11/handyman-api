import { routes } from '@application/routes'
import { UsersUseCases } from '@modules/users'
import { port } from '@utils/environment'
import { startJobs } from '@utils/jobs'
import { registerSockets } from '@utils/sockets'
import { appInstance } from '@utils/types'
import { initializeApp } from 'firebase-admin/app'

const start = async () => {
	initializeApp()
	await appInstance.startConnections()

	await registerSockets()
	await UsersUseCases.resetAllUsersStatus()
	appInstance.listener.callers = {
		onConnect: async (userId, socketId) => {
			await UsersUseCases.updateStatus({
				userId, socketId, add: true
			})
		},
		onDisconnect: async (userId, socketId) => {
			await UsersUseCases.updateStatus({
				userId, socketId, add: false
			})
		}
	}
	const app = appInstance.server
	app.routes = routes
	await app.start(port)
	await startJobs()
}

start().then()