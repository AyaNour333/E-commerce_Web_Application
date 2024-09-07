import { TProduct } from "./product.types"

export type TOrderItem ={
    id: number
    // userId: number
    items: TProduct[]
    subtotal: number
}