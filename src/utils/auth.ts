import { SaveCartToLSType } from '~/@types/carts.type'
import { User } from '~/@types/users.type'
import { oauth2Config } from '~/configs/oauth2.config'
import { Voucher } from '~/pages/Checkout/components/MyVoucher/fake'

export const saveTokenToLS = (token: string) => {
    localStorage.setItem('token', token)
}
export const getTokenFromLS = () => {
    return localStorage.getItem('token') || ''
}

export const clearTokenFromLS = () => {
    localStorage.removeItem('token')
}

export const saveProfileToLS = (profile: User) => {
    localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfileFromLS = () => {
    const profile = localStorage.getItem('profile')
    if (profile) {
        return JSON.parse(profile)
    }
    return null
}

export const clearCartFromLS = () => {
    localStorage.removeItem('carts')
}

export const clearProfileFromLS = () => {
    localStorage.removeItem('profile')
}

export const saveCartToLS = (carts: SaveCartToLSType) => {
    localStorage.setItem('carts', JSON.stringify(carts))
}

export const getCartsFromLS = () => {
    const carts = localStorage.getItem('carts')
    if (carts) {
        return JSON.parse(carts)
    }
    return []
}

export const saveVoucherToLS = (key: string, voucher: Voucher) => {
    localStorage.setItem(key, JSON.stringify(voucher))
}

export const getVoucherFromLS = (key: string) => {
    const voucher = localStorage.getItem(key)
    if (voucher) {
        return JSON.parse(voucher)
    }
    return null
}
export const loginWithGoogle = () => {
    console.log('Login with google...')
    const callbackUrl = oauth2Config.redirectUri
    const authUrl = oauth2Config.authUri
    const googleClientId = oauth2Config.clientId

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
        callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`
    window.location.href = targetUrl
}
