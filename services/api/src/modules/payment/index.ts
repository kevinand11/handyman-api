import { MethodRepository } from './data/repositories/methods'
import { TransactionRepository } from './data/repositories/transactions'
import { WalletRepository } from './data/repositories/wallets'
import { MethodsUseCase } from './domain/useCases/methods'
import { TransactionsUseCase } from './domain/useCases/transactions'
import { WalletsUseCase } from './domain/useCases/wallets'

const transactionRepository = TransactionRepository.getInstance()
const methodRepository = MethodRepository.getInstance()
const walletRepository = WalletRepository.getInstance()

export const TransactionsUseCases = new TransactionsUseCase(transactionRepository)
export const MethodsUseCases = new MethodsUseCase(methodRepository)
export const WalletsUseCases = new WalletsUseCase(walletRepository)

export { Currencies, TransactionStatus, TransactionType } from './domain/types'
export { FlutterwavePayment } from './utils/flutterwave'
export { retryTransactions } from './utils/transactions'
