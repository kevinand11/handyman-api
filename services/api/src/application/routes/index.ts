import { authRoutes } from './auth'
import { jobRoutes } from './jobs'
import { messagingRoutes } from './messaging'
import { notificationRoutes } from './notifications'
import { paymentRoutes } from './payment'
import { userRoutes } from './users'

export const routes = [
	...authRoutes,
	...jobRoutes,
	...messagingRoutes,
	...notificationRoutes,
	...paymentRoutes,
	...userRoutes
]