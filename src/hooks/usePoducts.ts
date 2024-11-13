import { actGetProductsByCategoryPrefix,cleanUpProductsRecords } from '@store/Products/productsSlice'
import { useAppDispatch , useAppSelector } from '@store/hooks'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function useProducts(){
    const dispatch = useAppDispatch()
    const params = useParams()
    const productPrefix = params.prefix
    const {loading , error , records} = useAppSelector(state => state.products)
    const cartItems = useAppSelector(state => state.cart.items)
    const wishListItemsId = useAppSelector(state => state.wishlist.itemsId)
    const userAccessToken = useAppSelector(state => state.auth.accessToken)
    const productsFullInfo = records.map(el => ({
        ...el ,
        quantity: cartItems[el.id] || 0 ,
        isLiked: wishListItemsId.includes(el.id),
        isAuthenticated: userAccessToken? true : false
    }))
    useEffect(()=>{
        const promise = dispatch(actGetProductsByCategoryPrefix(params.prefix as string))
        return ()=>{
            dispatch (cleanUpProductsRecords())
            promise.abort()
        }
    },[dispatch , params])
    return {loading , error , productsFullInfo , productPrefix}
}

export default useProducts