import {Product} from '@components/ecommerce'
import useProducts from '@hooks/usePoducts'
import { Container } from 'react-bootstrap'
import { Loading } from '@components/feedback'
import { GridList, Heading } from '@components/common'

function Products(){
    const {loading , error , productsFullInfo , productPrefix} = useProducts()
    return (
        <Container>
            {/* {params.prefix?.toUpperCase()} as children cause much renders so pass it as param */}
            <Heading title= {`${productPrefix?.toUpperCase()} Products`}/>
            <Loading type='product' status={loading} error={error}>
                <GridList records={productsFullInfo} renderItem={(record)=><Product {...record}/>}
                emptyMessage='There is no products'/>
            </Loading>
        </Container>
    )
}

export default Products