import { groupRoutes } from 'equipped'
import { emailRoutes } from './emails'
import { passwordsRoutes } from './passwords'
import { phoneRoutes } from './phone'
import { tokenRoutes } from './token'
import { userRoutes } from './user'

export const authRoutes = groupRoutes('/auth', [
	...emailRoutes,
	...passwordsRoutes,
	...phoneRoutes,
	...tokenRoutes,
	...userRoutes
])