import React from 'react'
import Cartrow from './Cartrow'
export default function Cart() {
    // the user data of the items which were added to the cart
    const cartdata = [
        {
            " title": "Wheat",
            "rate": "150"

        },
        {
            " title": "Wheat",
            "rate": "150"
        },
        {
            " title": "Wheat",
            "rate": "150"
        },
        {
            " title": "Wheat",
            "rate": "150"
        },
        {
            " title": "Wheat",
            "rate": "150"
        }
        ,
        {
            " title": "Wheat",
            "rate": "150"
        },
        {
            " title": "Wheat",
            "rate": "150"
        },
        {
            " title": "Wheat",
            "rate": "150"
        }
    ]
    return (
        <>
            <div className="container-fluid bg-secondary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight:"300px"}}>
                    <h1 className="font-weight-semi-bold text-uppercase mb-3">Shopping Cart</h1>
                    <div className="d-inline-flex">
                        <h2 className="m-0 "><a href="/home" className='text-danger'>Home</a></h2>
                        <p className="m-0 px-2">-</p>
                        <h2 className="m-0">Shopping Cart</h2>
                    </div>
                </div>
            </div>
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <div className="col-lg-8 table-responsive mb-5">
                        <table className="table table-bordered-primary text-center mb-0">
                            <thead className="bg-secondary text-dark">
                                <tr>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartdata.map(cartdata => (
                                    <Cartrow title={cartdata.title} rate={cartdata.rate} />))}
                            </tbody>
                        </table>

                    </div>



                    <div className="col-lg-4">
                        <form className="mb-5" action="">
                            <div className="input-group">
                                <input type="text" className="form-control p-4" placeholder="Coupon Code" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary">Apply Coupon</button>
                                </div>
                            </div>
                        </form>
                        <div className="card border-secondary mb-5">
                            <div className="card-header bg-secondary border-0">
                                <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-3 pt-1">
                                    <h6 className="font-weight-medium">Subtotal</h6>
                                    <h6 className="font-weight-medium">$150</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Shipping</h6>
                                    <h6 className="font-weight-medium">$10</h6>
                                </div>
                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5 className="font-weight-bold">Total</h5>
                                    <h5 className="font-weight-bold">$160</h5>
                                </div>
                                <button className="btn btn-block btn-primary my-3 py-3">Proceed To Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
