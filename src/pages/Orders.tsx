import { Heading } from "@components/common"
import { ProductInfo } from "@components/ecommerce"
import { Loading } from "@components/feedback"
import useOrders from "@hooks/useOrders"
import { Modal, Table } from "react-bootstrap"


function Orders(){
    const {loading,
    error,
    orderList,
    showModal,
    selectedProduct,
    viewDetailsHandler,
    closeModalHandler
    } = useOrders()
    return (
        <>
        <Modal show={showModal} onHide={closeModalHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Product Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedProduct.map(el => <ProductInfo key={el.id} direction="column"
                title={el.title} img={el.img} price={el.price} quantity={el.quantity}
                style={{marginTop: "10px"}}/>)}
            </Modal.Body>
        </Modal>
        <Heading title="My Order"/>
        <Loading status={loading} error={error} type="table">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order Number</th>
                        <th>Items</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList.map(el => (
                        <tr key={el.id}>
                            <td>#{el.id}</td>
                            <td>{el.items.length} item(s) {" / "}
                                <span style={{textDecoration:"underline" , cursor:"pointer"}}
                                onClick={() => viewDetailsHandler(el.id)}>
                                    Product Details
                                </span>
                            </td>
                            <td>{el.subtotal.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Loading>
        
        </>
    )
}

export default Orders