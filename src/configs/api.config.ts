export const API_URL = {
    BASE_API_URL: import.meta.env.VITE_API_URL,
    BASE_API_GHN_URL: import.meta.env.VITE_API_GHN_URL,
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGIN_GOOGLE: '/auth/oauth2/google',
    PRODUCT_SALES: '/products/sales',
    CATEGORIES: '/categories',
    BRANDS: '/brands',
    CARTS: '/carts',
    PROFILE: '/users/profile',
    PROFILE_UPLOAD: '/users/profile/upload',
    CHANGE_PASSWORD: '/users/change-password',
    GET_PROVINCE: '/province',
    GET_DISTRICT: '/district',
    GET_WARD: '/ward',
    CREATE_ADDRESS: '/users/addresses'
}
