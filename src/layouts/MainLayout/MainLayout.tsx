import { Outlet } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import styles from './styles.module.css'
import {Header , Footer} from '@components/common'

const {container , wrapper} = styles
function MainLayout(){
    return (
        <Container className={container}>
            <Header/>
            <div className={wrapper}>
                <Outlet/>
            </div>
            <Footer/>
        </Container>
    ) 
}

export default MainLayout
