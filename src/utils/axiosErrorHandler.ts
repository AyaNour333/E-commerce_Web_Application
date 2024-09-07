import { isAxiosError } from "axios"

const axiosErrorHandler = (error: unknown)=>{
    // to insure error related to this http request 
    if(isAxiosError(error)){
        return(error.response?.data || error.response?.data.message || error.message)
    }else{
        // if not related to axios(http request) error and axios cant handle the error
        return ("un expected error")
    }
}

export default axiosErrorHandler