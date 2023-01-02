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
    
        <div>
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



                    <div class="col-lg-4">
                        <form class="mb-5" action="">
                            <div class="input-group">
                                <input type="text" class="form-control p-4" placeholder="Coupon Code" />
                                <div class="input-group-append">
                                    <button class="btn btn-primary">Apply Coupon</button>
                                </div>
                            </div>
                        </form>
                        <div class="card border-secondary mb-5">
                            <div class="card-header bg-secondary border-0">
                                <h4 class="font-weight-semi-bold m-0">Cart Summary</h4>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between mb-3 pt-1">
                                    <h6 class="font-weight-medium">Subtotal</h6>
                                    <h6 class="font-weight-medium">$150</h6>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <h6 class="font-weight-medium">Shipping</h6>
                                    <h6 class="font-weight-medium">$10</h6>
                                </div>
                            </div>
                            <div class="card-footer border-secondary bg-transparent">
                                <div class="d-flex justify-content-between mt-2">
                                    <h5 class="font-weight-bold">Total</h5>
                                    <h5 class="font-weight-bold">$160</h5>
                                </div>
                                <button class="btn btn-block btn-primary my-3 py-3">Proceed To Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
