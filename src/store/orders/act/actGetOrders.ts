import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { TOrderItem } from "@types";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type TResponse = TOrderItem[]
const actGetOrders = createAsyncThunk(
    "ordersSlice/actGetOrders" , 
    async(_ , thunkAPI)=>{
        const {rejectWithValue , getState , signal} = thunkAPI
        const { auth } = getState() as RootState
        try{
            const res = await axios.get<TResponse>(
                `/orders?userId=${auth.user?.id}` , 
                {signal}
            )
            return res.data
        }catch(error){
            return rejectWithValue(axiosErrorHandler(error))
        }
    })

export default actGetOrders