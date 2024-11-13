import styles from './styles.module.css'
// const { product, productImg, productInfo} =  styles;

type ProductInfoProps = {
    title: string
    img: string
    price: number
    direction?: "row" | "column"
    children?: React.ReactNode
    style?: React.CSSProperties
    quantity?: number
}

function ProductInfo({
    title ,
    img,
    price,
    direction = "row",
    children,
    style,
    quantity}: ProductInfoProps){
    return(
        <div className={`${styles[`product-${direction}`]}`} style={style}>
                <div className={`${styles[`productImg-${direction}`]}`}>
                <img
                    src={img}
                    alt={title}
                />
                </div>
                <div className={`${styles[`productInfo-${direction}`]}`}>
                <h2 title={title}>{title}</h2>
                <h3>{price.toFixed(2)} EGP</h3>
                {quantity && <h3>Total Quantity: {quantity}</h3>}
                {quantity && <h3>Total Price: {(quantity*price).toFixed(2)}</h3>}
                {children}
                </div>
            </div>
    )
}

export default ProductInfo