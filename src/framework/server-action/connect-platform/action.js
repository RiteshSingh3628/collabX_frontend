import URLS from "@/constants/urls";
import apiClient from "@/lib/utils/apiClient";

export const connectInstagram = async (token) => {
  
    try{
        const url = `${URLS.PLATFORM.CONNECT_INSTAGRAM}?token=${token}`
        window.location.href = url
    } catch(error){
        console.error("Error connecting Instagram:", error);    
    }
};