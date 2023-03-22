import { authRoutes } from './auth'
import { notificationRoutes } from './notifications'
import { paymentRoutes } from './payment'
import { userRoutes } from './users'

export const routes = [
	...authRoutes,
	...notificationRoutes,
	...paymentRoutes,
	...userRoutes
]