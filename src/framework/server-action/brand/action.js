import URLS from "@/constants/urls";
import apiClient from "@/lib/utils/apiClient";

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


