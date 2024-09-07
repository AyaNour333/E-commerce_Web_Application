import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCategoryPrefix from './act/actGetProductsByCategoryPrefix'
import { TLoading , TProduct , isString} from "@types";

export interface IProductsState{
    records : TProduct[],
    loading: TLoading,
    error : string | null
}

const initialState: IProductsState = {
    records : [],
    loading: "idle",
    error : null
}
const productsSlice = createSlice({
    initialState,
    name: "productsSlice",
    reducers: {
        cleanUpProductsRecords: (state)=>{
            state.records = []
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(actGetProductsByCategoryPrefix.pending ,(state)=>{
            state.loading = 'pending'
            state.error = null
        })
        builder.addCase(actGetProductsByCategoryPrefix.fulfilled ,(state , action)=>{
            state.loading = 'succeeded'
            state.records = action.payload
        })
        builder.addCase(actGetProductsByCategoryPrefix.rejected ,(state , action)=>{
            state.loading = 'failed'
            // state.error = action.payload as string   // if you very sure about the type
            if(isString(action.payload)){  
                state.error = action.payload
            }
        })
    }
})

export const {cleanUpProductsRecords} = productsSlice.actions
export {actGetProductsByCategoryPrefix}
export default productsSlice.reducer