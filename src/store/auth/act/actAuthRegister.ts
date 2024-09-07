import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type TFormData = {
    firstName: string
    lastName: string
    email: string
    password: string
}
const actAuthRegister = createAsyncThunk("authSlice/actAuthRegister" , 
    async(formData:TFormData , thunk)=>{
        const {rejectWithValue} = thunk
        try{
            // register exist in json-server-auth
            const res = await axios.post("/register" , formData)
            return res.data
        }catch(error){
            return rejectWithValue(axiosErrorHandler(error))
        }
    }
)

export default actAuthRegister