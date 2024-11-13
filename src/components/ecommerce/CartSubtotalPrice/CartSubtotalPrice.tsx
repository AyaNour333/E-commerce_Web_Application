import { TProduct } from '@types'
import styles from './styles.module.css'
import { Button, Modal, Spinner } from 'react-bootstrap'
import { useState } from 'react'
import { useAppDispatch } from '@store/hooks'
import { actPlaceOrder } from '@store/orders/ordersSlice'
import { clearCartAfterPlaceOrder } from '@store/cart/cartSlice'

type CartSubtotalPriceProps = {
    products: TProduct[]
    usrAccessToken: string | null
} 

function CartSubtotalPrice({products , usrAccessToken}:CartSubtotalPriceProps){
    const dispatch = useAppDispatch()

    const [loading , setLoading] = useState(false)
    const [error , setError] = useState<string|null>(null)
    const [showModal , setShowModal] = useState(false)
    const subtotal = products.reduce((acc , el)=>{
        if(el.quantity && typeof el.quantity === "number"){
            return acc + (el.price * el.quantity)
        }else{
            return acc
        }
    },0)
    const modalHandler = ()=>{
        setShowModal(!showModal)
        setError(null)
    }
    const placeOrderHandler = ()=>{
        setLoading(true)
        dispatch(actPlaceOrder(subtotal))
        .unwrap()
        .then(()=>{
            dispatch(clearCartAfterPlaceOrder())
            setShowModal(false)
        })
        .catch((error)=> setError(error))
        .finally(()=> setLoading(false))
    }
    return (
        <>
        <Modal show={showModal} onHide={modalHandler} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Placing Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to place order with Subtotal:{" "}
                {subtotal.toFixed(2)} EGP
                {!loading && error && (
                    <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
                )}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={modalHandler}>
                Close
            </Button>
            <Button variant="info" style={{color:"white"}} onClick={placeOrderHandler}>
                {loading? 
                <>
                <Spinner animation="border" size="sm"></Spinner> Loading...
                </>
                : "Confirm"}
            </Button>
            </Modal.Footer>
        </Modal>
        <div className={styles.container}>
            <span>Subtotal: </span>
            <span>{subtotal.toFixed(2)}EGP</span>
        </div>
        {usrAccessToken && 
        <div className={styles.container}>
            <span></span>
            <span>
                <Button variant='info' style={{color:"white"}} onClick={modalHandler}>
                    Place Order
                </Button>
            </span>
        </div>
        }
        </>
    )
}

export default CartSubtotalPrice