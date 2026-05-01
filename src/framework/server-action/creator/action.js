"use server";

import { serverApiClient } from "@/lib/utils/apiClient";
import { getUserSessionServer } from "@/lib/utils/session";
import URLS from "@/constants/urls";


export const updateCreatorProfile = async (payload)=>{
    try{
        const url = URLS.CREATOR.UPDATE;
        const options = {
            method: "PUT",
            body: JSON.stringify(payload),
        }
        const response = await serverApiClient(url, options);
        if(!response?.success){
            return { success: false, message: response?.message || 'Something went wrong', };
        }
        return response;
    }
    catch(error){
        console.error("Error updating creator profile:", error);
    }
}

export const fetchCreatorProfile = async () => {
    try {
        const session = await getUserSessionServer();
        const creatorId = session?.user?.id;
        if (!creatorId) return null;
        const url = URLS.CREATOR.PROFILE(creatorId);
        const response = await serverApiClient(url);
        if (!response?.success) return null;
        return response?.data;
    }
    catch(error){
        console.error("Error fetching creator profile:", error);
        return null;
    }
}

export const fetchOverallAnalytics = async () => {
    try {
        const session = await getUserSessionServer();
        const creatorId = session?.user?.id;
        if (!creatorId) return null;
        const url = URLS.CREATOR.OVERALL_ANALYTICS(creatorId);
        const response = await serverApiClient(url);
        if (!response?.success) return null;
        return response.data;
    }
    catch(error){
        console.error("Error fetching overall analytics:", error);
        return null;
    }
}

export const updateCoverPicture = async (formData) => {
    try {
        const response = await serverApiClient(URLS.CREATOR.COVER_PICTURE, {
            method: 'PATCH',
            body: formData,
            isForm: true,
        });
        if (!response?.success) {
            return { success: false, message: response?.message || 'Something went wrong' };
        }
        return response;
    } catch (error) {
        console.error('Error updating cover picture:', error);
        return { success: false, message: 'Something went wrong' };
    }
}

export const fetchCreatorHeroBanner = async () => {
    try {
        const session = await getUserSessionServer();
        const creatorId = session?.user?.id;
        if (!creatorId) return null;
        const url = URLS.CREATOR.HERO_BANNER(creatorId);
        const response = await serverApiClient(url);
        if (!response?.success) return null;
        return response?.data;
    }
    catch(error){
        console.error("Error fetching hero banner:", error);
        return null;
    }
}
