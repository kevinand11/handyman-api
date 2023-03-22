import { appInstance } from '@utils/types'
import { Currencies } from '../../domain/types'
import { WalletDbChangeCallbacks } from '../../utils/changes/wallets'
import { WalletMapper } from '../mappers/wallets'
import { WalletFromModel } from '../models/wallets'

const WalletSchema = new appInstance.dbs.mongo.Schema<WalletFromModel>({
	_id: {
		type: String,
		default: () => appInstance.dbs.mongo.toString()
	},
	userId: {
		type: String,
		required: true
	},
	balance: {
		amount: {
			type: Number,
			required: false,
			default: 0
		},
		currency: {
			type: String,
			required: false,
			default: Currencies.NGN
		}
	},
	createdAt: {
		type: Number,
		required: false,
		default: Date.now
	},
	updatedAt: {
		type: Number,
		required: false,
		default: Date.now
	}
}, { timestamps: { currentTime: Date.now }, minimize: false })

export const Wallet = appInstance.dbs.mongo.use().model<WalletFromModel>('PaymentWallet', WalletSchema)

export const WalletChange = appInstance.dbs.mongo.change(Wallet, WalletDbChangeCallbacks, new WalletMapper().mapFrom)