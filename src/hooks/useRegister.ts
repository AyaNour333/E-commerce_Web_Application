import { useForm, SubmitHandler } from "react-hook-form"
import { signUpType ,signUpSchema } from "@Validations/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { actAuthRegister, resetUi } from "@store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function useRegister(){
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {loading , error , accessToken} = useAppSelector(state => state.auth)
    const {register , handleSubmit , formState:{errors: formErrors} , getFieldState , trigger} 
    = useForm<signUpType>({
        mode: 'onBlur',
        resolver: zodResolver(signUpSchema),
    })

    const {
        emailAvailabilityStatus ,
        enteredEmail , 
        checkEmailAvailability , 
        resetCheckEmailAvailability
    } = useCheckEmailAvailability()

    const submitForm:SubmitHandler<signUpType> = (data)=>{
        const {firstName , lastName , email , password} = data
        dispatch(actAuthRegister({firstName , lastName , email , password})).unwrap()
        .then(()=> navigate('/login?message=account_created'))
    }
    // check email if ok and exist or not when blur after filling input field
    const emailOnBlurHandler = async(e: React.FocusEvent<HTMLInputElement>)=>{
        await trigger("email")
        const value = e.target.value
        const {isDirty , invalid} = getFieldState("email")
        if(isDirty && !invalid && enteredEmail !== value){
            // checking
            checkEmailAvailability(value)
        }
        if(isDirty && invalid && enteredEmail){
            resetCheckEmailAvailability()
        }
    }
    useEffect(()=>{
        return ()=> {
            dispatch(resetUi())
        }
    },[dispatch])
    return {loading , 
        error , 
        accessToken , 
        emailAvailabilityStatus ,
        formErrors,
        register , 
        handleSubmit , 
        submitForm ,
        emailOnBlurHandler
    }
}

export default useRegister