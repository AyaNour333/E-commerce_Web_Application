import { Button, Spinner , Modal } from 'react-bootstrap'
import styles from './styles.module.css'
import Like from '@assets/svg/like.svg?react'
import LikeFill from '@assets/svg/like-fill.svg?react'
import { TProduct } from '@types'
import { addToCart } from '@store/cart/cartSlice'
import { actLikeToggle } from '@store/wishlist/wishlistSlice'
import { useAppDispatch} from '@store/hooks'
import { useEffect, useState , memo } from 'react'
import ProductInfo from '../ProductInfo/ProductInfo'

const {maximumNotice , wishListBtn} = styles
function Product ({id , title , img , price , max , quantity , isLiked , isAuthenticated}:TProduct){
    const dispatch = useAppDispatch()
    const [isBtnDisabled , setIsBtnDisabled] = useState(false)
    const [isLoading , setIsLoading] = useState(false)
    const [showModal , setShowModal] = useState(false)
    const currentRemainingQuantity = max-(quantity ?? 0)
    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false
    useEffect(()=>{
        if(!isBtnDisabled){
            return
        }
        const debounce = setTimeout(()=>{
            setIsBtnDisabled(false)
        }
        ,300)
        return ()=> clearTimeout(debounce)
    },[isBtnDisabled])
    const addToCartHandler = ()=>{
        dispatch(addToCart(id))
        setIsBtnDisabled(true)
    }
    const likeToggleHandler = ()=>{
        if(isLoading){
            return   // to disable button while loading (clicking)
        }
        if(isAuthenticated){
            setIsLoading(true)
            dispatch(actLikeToggle(id))
            .unwrap()
            .then(()=> setIsLoading(false))
            .catch(()=> setIsLoading(false))
        }else{
            setShowModal(true)
        }
    }
    return(
        <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Login Required</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You need to login first to add this item to your wishlist.
            </Modal.Body>
        </Modal>
        <ProductInfo title={title} img={img} price={price}>
            <div className={wishListBtn} onClick={likeToggleHandler}>
                {isLoading
                ?<Spinner animation='border' size='sm' variant='primary'/> 
                : isLiked ? <LikeFill/> : <Like/>
                }
            </div>
            <p className={maximumNotice}>
                {quantityReachedToMax ? 
                "You reach to the limit" 
                : `You can add ${currentRemainingQuantity} item(s)`}
            </p>
            <Button variant="info" style={{ color: "white" , width: "100%" }} 
            onClick={addToCartHandler}
            disabled ={isBtnDisabled || quantityReachedToMax}
            >
                {isBtnDisabled?<><Spinner animation='border' size='sm'/> loading...</> : "Add To Cart"}
            </Button>
        </ProductInfo>
        </>
    )
}

export default memo(Product)