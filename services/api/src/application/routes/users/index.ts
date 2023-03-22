import { groupRoutes } from 'equipped'
import { usersRoutes } from './users'

export const userRoutes = groupRoutes('/users', [
	...usersRoutes
])