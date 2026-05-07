import URLS from "@/constants/urls";
import apiClient, { serverApiClient } from "@/lib/utils/apiClient";
import { getUserSessionServer } from "@/lib/utils/session";

export async function updateBrand(payload){
    try {
        const url = URLS.BRAND.UPDATE;
        const options = {
            method: "POST",
            body: JSON.stringify(payload),
        };
        const response = await apiClient(url, options);
        console.log("brand onboarding",response);
        if (!response?.success) {
            return { success: false, message: response?.message || 'Something went wrong', };
        }
        return response
    } catch (error) {
        console.log("updating brand error",error)
    }
}


export async function getBrandProfile() {
    try {
        const session = await getUserSessionServer();
        const brandId = session?.user?.id;
        if (!brandId) return { success: false, message: 'No brand id in session' };

        const url = URLS.BRAND.PROFILE(brandId);
        const response = await serverApiClient(url, { method: 'GET' });
        if (!response?.success) {
            return { success: false, message: response?.message || 'Failed to fetch brand profile' };
        }
        return response;
    } catch (error) {
        console.log('getBrandProfile error', error);
        return { success: false, message: 'Failed to fetch brand profile' };
    }
}


export async function createBrand(payload){
    console.log("create brand payload",payload)
    try {
        const url = URLS.BRAND.CREATE;
        const options = {
            method: "POST",
            body: JSON.stringify(payload),
        };
        const response = await apiClient(url, options);
        if (!response?.success) {
            return { success: false, message: response?.message || 'Something went wrong', };
        }
        return response
    } catch (error) {
        console.log("creating brand error",error)
    }
}


