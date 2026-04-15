const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const URLS = {
    AUTH:{
        LOGIN: `${BASE_URL}api/users/login`,
        SIGNUP: `${BASE_URL}api/users/register`,
        REFRESH: `${BASE_URL}api/auth/refresh-token`,
    },
    BRAND:{
        CREATE: `${BASE_URL}api/brands/create`,
        UPDATE: `${BASE_URL}api/brands/update`,
    },
    CREATOR:{
        CREATE: `${BASE_URL}api/creators/create`,
        UPDATE: `${BASE_URL}api/creators/update`,
        PROFILE: (creatorId) => `${BASE_URL}api/creators/${creatorId}/profile`,
        OVERALL_ANALYTICS: (creatorId) => `${BASE_URL}api/creators/${creatorId}/analytics`,
        HERO_BANNER: (creatorId) => `${BASE_URL}api/creators/${creatorId}/hero-banner`,
    },
    PLATFORM:{
        CONNECT_INSTAGRAM: `${BASE_URL}api/social-accounts/connect/instagram`,
    }
}

export default URLS;