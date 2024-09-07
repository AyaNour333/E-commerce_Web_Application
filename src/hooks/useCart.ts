import { actGetProductsByItems, cartItemChangeQuantity, cleanCartProductsFullInfo} from "@store/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { resetOrderStatus } from "@store/orders/ordersSlice"
import { useCallback, useEffect } from "react"

function useCart(){
    const dispatch = useAppDispatch()
    const {items , productsFullInfo , loading , error} = useAppSelector(state => state.cart)
    const usrAccessToken = useAppSelector(state => state.auth.accessToken)
    const placeOrderStatus = useAppSelector(state => state.orders.loading)
    useEffect(()=>{
        const promise = dispatch(actGetProductsByItems())
        return ()=> {
            dispatch(cleanCartProductsFullInfo())
            dispatch(resetOrderStatus())
            promise.abort()
        }
    },[])
    // productsFullInfo has not have quantity so i merged again
    const products = productsFullInfo.map(el => ({...el , quantity: items[el.id]}))
    // cartItemChangeQuantity always change according to parameters so need useCallback to render only cartItem that change
    const changeQuantityHandler = useCallback((id:number , quantity:number)=>{
        dispatch(cartItemChangeQuantity(({id , quantity})))
    }, [dispatch])
    return {loading , 
        error , 
        products , 
        changeQuantityHandler ,
        usrAccessToken,
        placeOrderStatus
    }
}

export default useCart