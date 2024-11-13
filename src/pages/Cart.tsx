import { Heading } from "@components/common"
import { CartItemList, CartSubtotalPrice } from "@components/ecommerce"
import { Loading, LottieHandler } from "@components/feedback"
import useCart from "@hooks/useCart"

function Cart(){
    const {loading , 
        error , 
        products , 
        changeQuantityHandler , 
        usrAccessToken , 
        placeOrderStatus 
    } = useCart()
    return(
        <>
        <Heading title= "Cart"/>
        <Loading type="cart" status={loading} error={error}>
            {products.length? 
            <>
                <CartItemList 
                products ={products} 
                changeQuantityHandler={changeQuantityHandler}
                />
                <CartSubtotalPrice products={products} usrAccessToken={usrAccessToken}/>
            </> : placeOrderStatus === "succeeded"
            ?  <LottieHandler type='success' message="Your order has been placed successfully"/>
            : <LottieHandler type='empty' message="Your cart is empty"/>}
        </Loading>
        </>
    )
}

export default Cart