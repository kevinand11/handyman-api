import { groupRoutes } from 'equipped'
import { methodsRoutes } from './methods'
import { transactionsRoutes } from './transactions'
import { walletsRoutes } from './wallets'

export const paymentRoutes = groupRoutes('/payment', [
	...transactionsRoutes,
	...methodsRoutes,
	...walletsRoutes
])