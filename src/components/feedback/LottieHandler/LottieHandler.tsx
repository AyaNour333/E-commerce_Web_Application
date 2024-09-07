import Lottie from "lottie-react"
import notFound from '@assets/lottieFiles/notFound.json'
import loading from "@assets/lottieFiles/loading.json"
import error from "@assets/lottieFiles/error.json"
import empty from "@assets/lottieFiles/empty.json"
import success from "@assets/lottieFiles/success.json"


const lottiFilesMap = {
    // key and value the same so we do not have to do this notFound:notFound
    notFound,
    loading,
    error,
    empty,
    success
}

type LottieHandlerProps = {
    type: keyof typeof lottiFilesMap
    message?: string,
    className?: string
}

function LottieHandler({type , message , className}:LottieHandlerProps){
    const messageStyle = type ==="error"?
    {fontSize: "19px",color: "red"}:{fontSize: "19px", marginTop:"30px"}
    return(
        <div className={`d-flex flex-column align-items-center`}>
            <Lottie animationData={lottiFilesMap[type]} 
            className={className}
            style={{width: '250px'}}
            />
            {message && <h3 style={messageStyle}>{message}</h3>}
        </div>
    )
}

export default LottieHandler