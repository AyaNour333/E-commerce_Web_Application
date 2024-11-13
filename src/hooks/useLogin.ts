import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, signInType } from '@Validations/signInSchema';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { actAuthLogin, resetUi } from '@store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useEffect } from 'react';

function useLogin(){
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [searchParams , setSearchParams] = useSearchParams()
    const {error , loading , accessToken} = useAppSelector(state => state.auth)
    const {register , handleSubmit , formState:{errors: formErrors}} = useForm<signInType>({
        mode: 'onBlur',
        resolver: zodResolver(signInSchema)
    })
    const submitForm:SubmitHandler<signInType> = async(data)=>{
        // like searchParams.get("message") === "account_created"
        if(searchParams.get("message")){
            setSearchParams("")
        }
        dispatch(actAuthLogin(data)).unwrap().then(()=>navigate("/"))
    }
    useEffect(()=>{
        return ()=> {
            dispatch(resetUi())
        }
    },[dispatch])
    return{error , 
        loading , 
        accessToken , 
        formErrors,
        searchParams,
        register , 
        handleSubmit ,
        submitForm
    }
}

export default useLogin