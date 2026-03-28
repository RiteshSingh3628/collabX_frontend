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
        CREATE: `${BASE_URL}api/influencers/create`,
        UPDATE: `${BASE_URL}api/influencers/update`,
    }
}

export default URLS;