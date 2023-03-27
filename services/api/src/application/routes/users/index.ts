import { groupRoutes } from 'equipped'
import { usersRoutes } from './users'
import { verificationsRoutes } from './verifications'

export const userRoutes = groupRoutes('/users', [
	...usersRoutes,
	...verificationsRoutes
])