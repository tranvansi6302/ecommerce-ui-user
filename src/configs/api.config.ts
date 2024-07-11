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
    ADDRESS: '/users/addresses',
    CREATE_ADDRESS: '/users/addresses',
    ORDER: '/orders',

    // GHN
    GHN_GET_PROVINCE: '/master-data/province',
    GHN_GET_DISTRICT: '/master-data/district',
    GHN_GET_WARD: '/master-data/ward',
    GHN_GET_AVAILABLE_SERVICES: '/v2/shipping-order/available-services',
    GHN_GET_FEE: '/v2/shipping-order/fee',
    GHN_GET_LEADTIME: '/v2/shipping-order/leadtime'
}
