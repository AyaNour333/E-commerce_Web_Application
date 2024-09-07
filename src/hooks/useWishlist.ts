import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetWishlist, cleanWishlistProductsFullInfo } from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";

function useWishlist(){
    const dispatch = useAppDispatch()
    const {loading ,error ,productsFullInfo} = useAppSelector(state => state.wishlist)
    const cartItems = useAppSelector(state => state.cart.items)
    useEffect(()=>{
        const promise = dispatch(actGetWishlist("productsFullInfo"))
        return () => {
            dispatch(cleanWishlistProductsFullInfo());
            promise.abort()
        };
    },[dispatch])
    const records = productsFullInfo.map(el => ({
        ...el ,
        quantity: cartItems[el.id] || 0 ,
        isLiked: true,
        isAuthenticated: true
    }))
    return {loading , error , records }
}

export default useWishlist