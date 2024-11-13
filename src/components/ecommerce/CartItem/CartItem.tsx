import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@types";
import { memo } from "react";
import { cartItemRemove } from "@store/cart/cartSlice";
import { useAppDispatch } from "@store/hooks";
import ProductInfo from "../ProductInfo/ProductInfo";

const { cartItem , cartItemSelection } =  styles;
type CartItemProps = TProduct & {
    changeQuantityHandler : (id:number , quantity:number)=> void
}
function CartItem({id , title , img , price  ,max , quantity , changeQuantityHandler }:CartItemProps){
    const dispatch = useAppDispatch()
    const renderOptions = Array(max).fill(0).map((_, idx)=>{
        const quantity = ++idx
        return <option value={quantity} key={quantity}>{quantity}</option>  // [0,0,0,0] if max=4 and so on.
    })
    const changeQuantity = (event:React.ChangeEvent<HTMLSelectElement>)=>{
        const quantity = +event.target.value
        changeQuantityHandler(id , quantity)
    }
    return (
        <div className={cartItem}>
            <ProductInfo title={title} img={img} price={price} direction="column">
                <Button
                    variant="secondary"
                    style={{ color: "white" , width: "100px"}}
                    className="mt-auto"
                    onClick={()=> dispatch(cartItemRemove(id))}>
                    Remove 
                </Button>
            </ProductInfo>
            <div className={cartItemSelection}>
                <span className="d-block mb-1">Quantity</span>
                <Form.Select aria-label="Default select example" 
                value={quantity} onChange={changeQuantity}>
                {renderOptions}
                </Form.Select>
            </div>
        </div>
    );
}

export default memo(CartItem) 