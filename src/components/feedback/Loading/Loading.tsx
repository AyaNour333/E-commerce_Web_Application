import { TLoading } from "@types"
import { ReactNode } from "react"
import CategorySkeleton from "../Skeletons/CategorySkeleton/CategorySkeleton"
import ProductSkeleton from "../Skeletons/ProductSkeleton/ProductSkeleton"
import CartSkeleton from "../Skeletons/CartSkeleton/CartSkeleton"
import LottieHandler from "../LottieHandler/LottieHandler"
import TableSkeleton from "../Skeletons/TableSkeleton/TableSkeleton"


const skeletonTypes = {
    category: CategorySkeleton,
    product: ProductSkeleton,
    cart: CartSkeleton,
    table: TableSkeleton
}

// TLoading this true also
type LoadingProps = {
    status: TLoading,
    error : string | null
    children : ReactNode
    type? : keyof typeof skeletonTypes
}

function Loading({status , error , children , type="category"}:LoadingProps){
    // Component is a Component so starts with capital
    const Component = skeletonTypes[type]
    if(status === "pending"){
        return <Component/>
    }
    if(status === 'failed'){
        return <LottieHandler type="error" message={error as string} className=""/>
    }
    return(
        <>{children}</>
    )
}

export default Loading