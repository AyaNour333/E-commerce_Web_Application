import { Col, Row } from 'react-bootstrap'
import { LottieHandler } from '@components/feedback'

type GridListProps<T> ={
    records: T[],
    renderItem: (record:T)=> React.ReactNode,
    emptyMessage: string 
}
type HasId ={
    id?:number
}
function GridList <T extends HasId>({records , renderItem , emptyMessage}:GridListProps<T>){
    return(
        <Row>
            {records.length>0 ? records.map((record)=>
                <Col xs={6} md={3} key={record.id} className='d-flex justify-content-center mb-5 mt-2'>
                    {renderItem(record)}
                </Col>
            ) : <LottieHandler type='empty' message={emptyMessage}/>}
        </Row>
    )
}

export default GridList