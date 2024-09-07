import { createSlice } from "@reduxjs/toolkit";
import { isString, TLoading, TOrderItem } from "@types";
import actPlaceOrder from "./act/actPlaceOrder";
import actGetOrders from "./act/actGetOrders";

export interface IOrderSlice{
    orderList: TOrderItem[]
    loading: TLoading
    error: string | null
}
const initialState:IOrderSlice ={
    orderList: [],
    loading: "idle",
    error: null
}
const ordersSlice = createSlice({
    name: "ordersSlice",
    initialState,
    reducers: {
        resetOrderStatus: (state)=>{
            state.loading = "idle"
            state.error = null
        }
    },
    extraReducers: (builder)=>{
        // place order
        builder.addCase(actPlaceOrder.pending , (state)=>{
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(actPlaceOrder.fulfilled , (state)=>{
            state.loading = "succeeded"
        })
        builder.addCase(actPlaceOrder.rejected , (state , action)=>{
            state.loading = "failed"
            if(isString(action.payload)){  
                state.error = action.payload
            }
        })
        // get orders
        builder.addCase(actGetOrders.pending , (state)=>{
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(actGetOrders.fulfilled , (state , action)=>{
            state.loading = "succeeded"
            state.orderList = action.payload
        })
        builder.addCase(actGetOrders.rejected , (state , action)=>{
            state.loading = "failed"
            if(isString(action.payload)){  
                state.error = action.payload
            }
        })
    }
})

export const {resetOrderStatus} = ordersSlice.actions
export {actPlaceOrder , actGetOrders}
export default ordersSlice.reducer