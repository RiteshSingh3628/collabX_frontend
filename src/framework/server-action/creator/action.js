import apiClient from "@/lib/utils/apiClient";
import URLS from "@/constants/urls";


export const updateCreatorProfile = async (payload)=>{
    try{
        console.log("payload for creator onboarding",payload);
        const url = URLS.CREATOR.UPDATE;
        console.log("URL for creator onboarding",url);
        const options = {
            method: "PUT",
            body: JSON.stringify(payload),

        }
        const response = await apiClient(url, options);
        console.log("creator onboarding",response);
        if(!response?.success){
            return { success: false, message: response?.message || 'Something went wrong', };
        }
        return response;
    }
    catch(error){
        console.error("Error updating creator profile:", error);
    }
}

export const fetchCreatorProfile = async (creatorId)=>{
    try{
        console.log("fetching creator profile");  
        const url = URLS.CREATOR.PROFILE(creatorId);
        console.log("URL for fetching creator profile",url);
        const response = await apiClient(url);
        console.log("response for fetching creator profile",response);
        if(!response?.success){
            return { success: false, message: response?.message || 'Something went wrong', };
        }
        return response;
    }
    catch(error){
        console.error("Error fetching creator profile:", error);
    }
}

export const fetchOverallAnalytics = async (creatorId)=>{
    try{
        console.log("fetching overall analytics for creator", creatorId);  
        const url = URLS.CREATOR.OVERALL_ANALYTICS(creatorId);
        console.log("URL for fetching overall analytics",url);
        const response = await apiClient(url);
        console.log("response for fetching overall analytics",response);
        if(!response?.success){
            return { success: false, message: response?.message || 'Something went wrong', };
        }
        return response;
    }
    catch(error){
        console.error("Error fetching overall analytics:", error);
    }
}
 