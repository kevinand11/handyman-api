import { EmailsList, getEnvOrFail } from 'equipped'

const useSSL = parseInt(getEnvOrFail('USE_SSL'))
export const baseDomain = `http${useSSL ? 's' : ''}://` + getEnvOrFail('BASE_DOMAIN')
export const port = parseInt(getEnvOrFail('PORT'))
export const appId = getEnvOrFail('APP_ID')

export const environment = getEnvOrFail('ENVIRONMENT')
export const isDev = environment === 'local'
export const isProd = environment === 'production'

const mails = JSON.parse(getEnvOrFail('EMAILS') || '{}')
export const emails = Object.fromEntries(
	Object.entries(EmailsList).map(([key, value]) => [value, {
		privateKey: mails[key.toLowerCase()].private_key,
		clientId: mails[key.toLowerCase()].client_id
	}])
)

export const clientDomain = `http${!isDev ? 's' : ''}://` + getEnvOrFail('CLIENT_DOMAIN')

const flutterwave = JSON.parse(getEnvOrFail('FLUTTERWAVE') || '{}')
export const flutterwaveConfig = {
	secretKey: flutterwave.secretKey,
	publicKey: flutterwave.publicKey
}

export const superAdminEmail = getEnvOrFail('SUPER_ADMIN')

export const termiiAPIKey = getEnvOrFail('TERMII_API_KEY')
