import { authRoutes } from './auth'
import { jobRoutes } from './jobs'
import { notificationRoutes } from './notifications'
import { paymentRoutes } from './payment'
import { userRoutes } from './users'

export const routes = [
	...authRoutes,
	...jobRoutes,
	...notificationRoutes,
	...paymentRoutes,
	...userRoutes
]