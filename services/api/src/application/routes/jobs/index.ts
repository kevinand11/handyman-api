import { groupRoutes } from 'equipped'
import { categoriesRoutes } from './categories'

export const jobRoutes = groupRoutes('/jobs', [
	...categoriesRoutes
])