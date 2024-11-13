import { GridList, Heading } from "@components/common";
import {Product} from '@components/ecommerce'
import { Loading } from "@components/feedback";
import useWishlist from "@hooks/useWishlist";
import { Container } from "react-bootstrap";

function Wishlist(){
    const {loading , error , records } = useWishlist()
    return(
        <Container>
            <Heading title= "Your Wishlist"/>
            <Loading type="product" status={loading} error={error}>
                <GridList records={records} renderItem={(record)=><Product {...record}/>}
                emptyMessage='Your wishlist is empty'/>
            </Loading>
        </Container>
    )
}
export default Wishlist