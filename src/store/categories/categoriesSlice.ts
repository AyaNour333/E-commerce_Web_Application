import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import { TCategory ,TLoading , isString } from "@types";

// typing of object && type safe of each records,loading,error
export interface ICategoriesState {
    records: TCategory[],
    loading: TLoading,
    error: string | null
}

const initialState: ICategoriesState = {
    records: [],
    loading: "idle",
    error: null
}

const categoriesSlice= createSlice({
    initialState,
    name: "categoriesSlice",
    reducers: {
        categoriesRecordsCleanUp : (state)=>{
            state.records = []
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(actGetCategories.pending ,(state)=>{
            state.loading = 'pending'
            state.error = null
        })
        builder.addCase(actGetCategories.fulfilled ,(state , action)=>{
            state.loading = 'succeeded'
            state.records = action.payload
        })
        builder.addCase(actGetCategories.rejected ,(state , action)=>{
            state.loading = 'failed'
            // state.error = action.payload as string   // if you very sure about the type
            // this is best
            if(isString(action.payload)){  
                state.error = action.payload
            }
        })
    }
})

export const {categoriesRecordsCleanUp} = categoriesSlice.actions
export {actGetCategories}
export default categoriesSlice.reducer