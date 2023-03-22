import { AuthUserType, Phone } from '@modules/auth'

declare module 'equipped/lib/utils/authUser' {
    interface AuthUser {
        type: AuthUserType
        email: string
        phone: Phone
        isEmailVerified: boolean
        isPhoneVerified: boolean
    }
}