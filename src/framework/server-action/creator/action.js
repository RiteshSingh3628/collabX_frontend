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