import { groupRoutes } from 'equipped'
import { categoriesRoutes } from './categories'
import { reviewsRoutes } from './reviews'

export const jobRoutes = groupRoutes('/jobs', [
	...categoriesRoutes,
	...reviewsRoutes
])