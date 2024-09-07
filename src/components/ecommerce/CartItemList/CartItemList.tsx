import { TProduct } from "@types"
import CartItem from "../CartItem/CartItem"

type CartItemListProps ={
    products : TProduct[]
    changeQuantityHandler : (id:number , quantity:number)=> void
    // removeItemHandler : (id:number)=> void
}
function CartItemList({products , changeQuantityHandler }:CartItemListProps){
    const renderList = products.map(product => <CartItem key={product.id} 
        {...product} 
        changeQuantityHandler={changeQuantityHandler}
        />)
    return(
        <div>{renderList}</div>
    )
}

export default CartItemList