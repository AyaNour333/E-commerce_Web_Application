import { useAppDispatch, useAppSelector } from "@store/hooks"
import { actGetOrders, resetOrderStatus } from "@store/orders/ordersSlice"
import { TProduct } from "@types"
import { useEffect, useState } from "react"

function useOrders(){
    const dispatch = useAppDispatch()
    const {loading, error, orderList} = useAppSelector(state => state.orders)
    const [showModal , setShowModal] = useState(false)
    const [selectedProduct , setSelectedProduct] = useState<TProduct[]>([])
    useEffect(()=>{
        const promise = dispatch(actGetOrders())
        return () => {
            promise.abort()
            dispatch(resetOrderStatus())
        }
    },[dispatch])
    const viewDetailsHandler = (id:number)=>{
        const productDetails = orderList.find(order => order.id === id)
        const newItems = productDetails?.items ?? []
        setShowModal(true)
        setSelectedProduct(prev => [...prev,...newItems])
    }
    const closeModalHandler = ()=>{
        setShowModal(false)
        setSelectedProduct([])
    }
    return{loading,
        error,
        orderList,
        showModal,
        selectedProduct,
        viewDetailsHandler,
        closeModalHandler
    }
}

export default useOrders