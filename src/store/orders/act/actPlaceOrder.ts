import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actPlaceOrder = createAsyncThunk(
    "ordersSlice/actPlaceOrder" ,
    async(subtotal: number , thunkAPI)=>{
        const {rejectWithValue , getState} = thunkAPI
        const { cart , auth } = getState() as RootState
        const orderItems = cart.productsFullInfo.map(el => ({
            id: el.id,
            title: el.title,
            price: el.price,
            img: el.img,
            quantity: cart.items[el.id]
        }))
        try{
            const res = await axios.post('/orders' , {
                userId: auth.user?.id,
                items: orderItems,
                subtotal
            })
            return res.data
        }catch(error){
            return rejectWithValue(axiosErrorHandler(error))
        }
    })

export default actPlaceOrder