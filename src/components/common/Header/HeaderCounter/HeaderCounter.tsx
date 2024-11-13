import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type HeaderCounterProps = {
    totalQuantity:number,
    svgIcon: React.ReactNode,
    to: string,
    title: string
}

const {container , totalNum , pumpAnimate , iconWrapper} = styles
function HeaderCounter({totalQuantity , svgIcon , to ,title}:HeaderCounterProps){
    const navigate = useNavigate()
    const [isAnimate , setIsAnimate] = useState(false)
    const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ""}`

    useEffect(()=>{
        if(!totalQuantity){
            return
        }
        setIsAnimate(true)
        const debounce = setTimeout(()=>{
            setIsAnimate(false)
        },300)
        return ()=> clearTimeout(debounce)
    },[totalQuantity])
    return(
        <div className={container} onClick={()=>navigate(to)}>
            <div className={iconWrapper}>
                {svgIcon}
                {totalQuantity > 0 && <div className={quantityStyle}>{totalQuantity}</div>}
            </div>
            <h3>{title}</h3>
        </div>
    )
}

export default HeaderCounter
