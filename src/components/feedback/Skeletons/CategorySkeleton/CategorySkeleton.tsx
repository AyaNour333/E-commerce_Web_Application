import { Col, Row } from "react-bootstrap"
import ContentLoader from "react-content-loader"

function CategorySkeleton(){
    const renderSkeletons = Array(4).fill(0).map((_,idx)=>(
        <Col key={idx} xs={3} className='d-flex justify-content-center mb-5 mt-2'>
            <ContentLoader 
                speed={2}
                width={180}
                height={209}
                viewBox="0 0 180 209"
                backgroundColor="#f5f5f5"
                foregroundColor="#ffffff"
            >
                <rect x="39" y="188" rx="4" ry="4" width="100" height="6" /> 
                <circle cx="86" cy="108" r="65" />
            </ContentLoader>
        </Col>
    ))
    return(
    <Row>
        {renderSkeletons}
    </Row>
    )
}

export default CategorySkeleton