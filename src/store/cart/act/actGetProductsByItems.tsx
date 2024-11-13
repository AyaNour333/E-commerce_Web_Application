import { TProduct } from "@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import {axiosErrorHandler} from "@utils";
import axios from "axios";

type TResponse = TProduct[]

const actGetProductsByItems = createAsyncThunk(
    "cartSlice/actGetProductsByItems" , 
    async(_ , thunkAPI)=>{
        const {rejectWithValue , fulfillWithValue , getState , signal} = thunkAPI
        const {cart} = getState() as RootState
        const itemsId = Object.keys(cart.items) // array of ids
        if(!itemsId.length){
            return fulfillWithValue([]);
        }
        try{
            const concatenatedItemsId = itemsId.map(el => `id=${el}`).join("&")
            const response = await axios.get<TResponse>(`/products?${concatenatedItemsId}` , {signal})
            return response.data
        }catch(error){
            return rejectWithValue(axiosErrorHandler(error))
        }
    })

export default actGetProductsByItems     