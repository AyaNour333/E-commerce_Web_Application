import { createSelector} from "@reduxjs/toolkit";
import { RootState } from "@store";


const getCartTotalQuantity = createSelector(
    (state:RootState)=>state.cart.items , 
    (items)=>{
        const totalQuantity = Object.values(items).reduce(
            (acc , current)=> {
                return acc + current
            } , 0)
        return totalQuantity
})

export  {getCartTotalQuantity}