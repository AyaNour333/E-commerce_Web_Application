import {Category} from '@components/ecommerce'
import { Container } from 'react-bootstrap'
import { GridList, Heading } from '@components/common'
import { Loading } from '@components/feedback'
import useCategories from '@hooks/useCategories'

function Categories(){
    const {loading , error , records} = useCategories()
    return (
        <Container>
            <Heading title= "Categories"/>
            <Loading type='category' status={loading} error={error}>
                <GridList records={records} renderItem={(record)=><Category {...record}/>}
                emptyMessage='There is no categories'/>
            </Loading>
        </Container>
    )
}

export default Categories