import { TProduct , TLoading , isString} from "@types";
import { createSlice } from "@reduxjs/toolkit";
import { getCartTotalQuantity } from "./selectors";
import actGetProductsByItems from "./act/actGetProductsByItems";

export interface ICartState {
    items: {[key: string]:number},
    productsFullInfo: TProduct[]
    loading: TLoading
    error: string | null
}
const initialState:ICartState = {
    items : {},
    productsFullInfo: [],
    loading: "idle",
    error: null
}
const cartSlice = createSlice({
    initialState,
    name: "cartSlice",
    reducers:{
        addToCart : (state , action)=>{
            const id = action.payload
            if(state.items[id]){
                state.items[id]++  // items[id] => {id : quantity} {key:value}
            }else{
                state.items[id] = 1
            }
        },
        cartItemChangeQuantity : (state , action)=>{
            state.items[action.payload.id] = action.payload.quantity
        },
        cartItemRemove: (state , action)=>{
            delete state.items[action.payload]
            state.productsFullInfo = state.productsFullInfo.filter(el => el.id !== action.payload)
        },
        cleanCartProductsFullInfo: (state)=>{
            state.productsFullInfo = []
        },
        clearCartAfterPlaceOrder: (state)=>{
            state.items = {}
            state.productsFullInfo = []
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(actGetProductsByItems.pending , (state)=>{
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(actGetProductsByItems.fulfilled , (state , action)=>{
            state.loading = "succeeded"
            state.productsFullInfo = action.payload
        })
        builder.addCase(actGetProductsByItems.rejected , (state , action)=>{
            state.loading = "failed"
            if(isString(action.payload)){  
                state.error = action.payload
            }
        })
    }
})



export { getCartTotalQuantity , actGetProductsByItems}
export const 
    {addToCart , 
    cartItemChangeQuantity , 
    cartItemRemove , 
    cleanCartProductsFullInfo,
    clearCartAfterPlaceOrder
    } = cartSlice.actions
export default cartSlice.reducer