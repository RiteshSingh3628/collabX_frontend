const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const URLS = {
    AUTH:{
        LOGIN: `${BASE_URL}api/user/login`,
        SIGNUP: `${BASE_URL}api/user/register`,
        REFRESH: `${BASE_URL}api/auth/refresh-token`,
    },
    BRAND:{
        CREATE: `${BASE_URL}api/brands/create`,
        UPDATE: `${BASE_URL}api/brands/update`,
    },
    CREATOR:{
        CREATE: `${BASE_URL}api/creators/create`,
        UPDATE: `${BASE_URL}api/creators/update`,
    },
    PLATFORM:{
        CONNECT_INSTAGRAM: `${BASE_URL}api/social-accounts/connect/instagram`,
    }
}

export default URLS;