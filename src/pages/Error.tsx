import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import '@styles/global.css'
import {LottieHandler} from "@components/feedback"

function Error(){
    return (
        <Container>
            <div className="d-flex flex-column align-items-center"
            style={{marginTop: '15%'}}
            >
                <LottieHandler type="notFound" className="error-404"/>
                {/* replace to avoid forward to this page again this remove from stack(lifo) */}
                <Link to='/' replace={true}>How about going back to safety?</Link>
            </div>
        </Container>
    )
}

export default Error