import HeaderCounter from '../HeaderCounter/HeaderCounter'
import styles from './style.module.css'
import { useAppSelector } from '@store/hooks'
import { getCartTotalQuantity } from '@store/cart/selectors'
import WishlistIcon from '@assets/svg/wishlist.svg?react'
import CartIcon from '@assets/svg/cart.svg?react'

const { headerLeftBar } = styles
function HeaderLeftBar(){
    const wishlistTotalQuantity = useAppSelector(state => state.wishlist.itemsId.length)
    const cartTotalQuantity = useAppSelector(getCartTotalQuantity)
    return(
        <div className={headerLeftBar}>
                <HeaderCounter 
                    to='wishlist' 
                    totalQuantity={wishlistTotalQuantity}
                    svgIcon={<WishlistIcon title='wishlist'/>}
                    title='Wishlist'
                />
                <HeaderCounter 
                    to='cart' 
                    totalQuantity={cartTotalQuantity}
                    svgIcon={<CartIcon title='cart'/>}
                    title='Cart'
                />
        </div>
    )
}
export default HeaderLeftBar
