import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import PaymentSummary from '../Cart/PaymentSummary'
import { useCartContext } from '../../Context/cart_context';
import CartItem from '../Cart/CartItem';
import AuthContext from '../../Context/auth_context';
import SingleProductSummary from './SingleProductSummary';
import { useNavigate } from 'react-router-dom';
import './checkout.css';
export default function CheckoutForm() {

    const { cart, clearCart, setdiscount} = useCartContext();
    // console.log( localStorage.getItem("Buynow"));
    const {loggedIn, userId } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }
    }, [])

    // creating  a state to store the values from the user
    const [dcity,setCity]=useState(false);
    const [Record, SetRecord] = useState([]);
    const [display, setdisplay] = useState(false);
    const [btnvalue,setbtnvalue]=useState("Check details");
    const [BillingInfo, setBillingInfo] = useState({
        name: "",
        email: "",
        address1: "",
        address2: "",
        state: "",
        city: "",
        pincode: "",
        mobileNumber1: "",
        mobileNumber2: "",
    })
    
    const f1=()=>{
     
        if(!display)
        setbtnvalue("Close Details");
        else
        setbtnvalue("Check Details");  
        setdisplay(!display);
    }
    async function details() {
        try {
            const response = await axios.get("/auth/dashboard")
            setBillingInfo({
                name: response.data.name,
                email: response.data.email,
                address1: "",
                address2: "",
                state: "",
                city: "",
                pincode: "",
                mobileNumber1: response.data.phoneno,
                mobileNumber2: "",
                cash_on_delivery:"",
                payment_status:"",
                transaction_code:"",
    
            })
        } catch (err) {
            console.error(err);
        }
    }
        //local storage
        var x=localStorage.getItem("Buynow");
        // console.log(x);
        let id=x.slice(2);
        // console.log(id);
        // console.log("hello from here")
        const [productDetails,setproductDetails]=useState({"_id":"63bff8bc549ff24265d6afaa","images":[{"imgUrl":"https://www.gomataseva.org/thumb.php?w=480&h=480&zc=2&q=100&src=https://www.gomataseva.org/uploads/productimages/go-real-soap.jpg"},{"imgUrl":"https://www.gomataseva.org/thumb.php?w=480&h=480&zc=2&q=100&src=https://www.gomataseva.org/uploads/productimages/go-real-soap.jpg"},{"imgUrl":"https://www.gomataseva.org/thumb.php?w=480&h=480&zc=2&q=100&src=https://www.gomataseva.org/uploads/productimages/go-real-soap.jpg"},{"imgUrl":"https://www.gomataseva.org/thumb.php?w=480&h=480&zc=2&q=100&src=https://www.gomataseva.org/uploads/productimages/go-real-soap.jpg"}],"name":"GOREAL - COW URINE SOAP","description":"GoReal Ayurvedic soap made from Panchgavya and Gir cow milk.","price":30,"category":"Bathing","feature":"false"});
        const callapi=async()=>{
            await axios.get(`/product/${id}`)
            .then((res)=>{console.log(res.data); setproductDetails(res.data)});   
            
        }
    
    // useEffect(() => {
    //     console.log(productDetails)
    // }, [productDetails])
    
    useEffect(() => {
        if (x[0] === 'u') {
            callapi();
        }
        details();
    }, []);
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        //  console.log(name, value);
        if(name==="state")
        {
            if(value==="Other"){
            setdiscount(50,"os");
            setCity(false);}
            if(value==="Madhya Pradesh")
            {
                setdiscount(50,"oc");
                setCity(true);
            
            }

        }
        if(name==="city")
        {
           if(BillingInfo.state=="Madhya Pradesh"){
            if(value==="Other")
            setdiscount(50,"oc");
            else
            setdiscount(70,"is");}
        }
        

        setBillingInfo({ ...BillingInfo, [name]: value })
    }
    const onSubmit = (e) => {
 
        if(BillingInfo.state==="other")
        {
          
              let val=BillingInfo.stateother
              setBillingInfo({ ...BillingInfo, state:val});
               val=BillingInfo.cityother
              setBillingInfo({ ...BillingInfo, city:val});
        }
        else
        {
            if(BillingInfo.city=="other"){   
            let val=BillingInfo.cityother
            setBillingInfo({ ...BillingInfo, city:val});}
            
        }
        e.preventDefault();     
        const newRecord = { ...BillingInfo, id: new Date().getTime().toString() }
        // console.log(newRecord);
        SetRecord([...Record, newRecord]);
        setBillingInfo({
            name: "",
            email: "",
            address1: "",
            address2: "",
            state: "",
            city: "",
            pincode: "",
            mobileNumber1: "",
            mobileNumber2: "",
            cash_on_delivery:"",
            payment_status:"",
            transaction_code:"",
        });
    }

    const clearcart=async()=>{
        await axios.post("/cart/clearcart",{})
        .then((res)=>{ navigate('/qrpayment')});
      }
    
    const payment = async () => {
        const { name, email, address1, address2, state, city, pincode, mobileNumber1, mobileNumber2,cash_on_delivery , payment_status,
            transaction_code,} = BillingInfo;
        if (name && address1 && pincode && mobileNumber1) {
            // console.log(x);

            // console.log(id)
            if (x[0] === 'c') {
                await axios.post(`/order/orderbycart/${id}`, { ordername: name, address: address1, addressoptional: address2, state, city, postalcode: pincode, ordermobile1: mobileNumber1, ordermobile2: mobileNumber2,cash_on_delivery, payment_status,
                    transaction_code, })
                    .then((res)=>{clearcart()})
            }
            else {
                await axios.post(`/order/orderbyproduct/${userId}/${id}`, { ordername: name, address: address1, addressoptional: address2, state, city, postalcode: pincode, ordermobile1: mobileNumber1, ordermobile2: mobileNumber2,cash_on_delivery , payment_status,
                    transaction_code,})
                    .then((res)=>{navigate('/qrpayment')})
            }
        }
        else {
            alert("Invalid Details");
        }
    }

    return (
        <div>
            <div className="container my-4">
                <main>
                    <div className="row d-flex .flex-wrap-reverse">
                        <div className="col-md-7 col-lg-8">
                            <h4 className="mb-3">Billing address</h4>
                            <form action='' onSubmit={onSubmit}>
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <label className="form-label" >Name</label>
                                        <input type="text" className="form-control" name="name" placeholder=" " value={BillingInfo.name} onChange={handleInput} required />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="email" className="form-label">Email <span className="text-muted">(Optional)</span></label>
                                        <input type="email" pattern='[a-z0-9]+@[a-z]+\.[a-z]{2,3}' className="form-control" name='email' placeholder="you@example.com" value={BillingInfo.email} onChange={handleInput} required />
                                        <div className="invalid-feedback">
                                            Please enter a valid email address htmlFor shipping updates.
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="address" className="form-label"  >Address1</label>
                                        <input type="text" className="form-control" id="address" name='address1' placeholder="1234 Main St" value={BillingInfo.address1} onChange={handleInput} required />
                                        <div className="invalid-feedback">
                                            Please enter your shipping address.
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="address2" className="form-label" >Address 2 <span className="text-muted">(Optional)</span></label>
                                        <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" name='address2' value={BillingInfo.address2} onChange={handleInput} required />
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="state" className="form-label">State</label>
                                        <select className="form-select" id="state" placeholder='choose...' name='state' value={BillingInfo.state} onChange={handleInput} required >
                                        {/* <option value="" disabled selected hidden>Select State</option> */}
                                            <option>Other</option>
                                            <option>Madhya Pradesh</option>
                                        </select>
                                        <input type="text" name="stateother" placeholder='enter the state name' value={BillingInfo.stateother} onChange={handleInput} style={{display:"block"}} required/>

                                        <div className="invalid-feedback">
                                            Please provide a valid state.
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <label htmlFor="city" className="form-label">City</label>
                                        {dcity ?<select className="form-select" id="country" name='city' placeholder='choose...' value={BillingInfo.city} onChange={handleInput} required>
                                        {/* <option value="" disabled selected hidden>Select City</option> */}
                                            <option>Other</option>
                                            <option>Indore</option>
                                        </select>: <></>}
                                        <input type="text" name="cityother"  placeholder='enter the city name'  value={BillingInfo.cityother} onChange={handleInput} style={{display:"block"}} required/>

                                    </div>

                                    <div className="col-md-3">
                                        <label htmlFor="zip" className="form-label" >Postal Code</label>
                                        <input type="number" min="100000" max="999999"  className="form-control" name="pincode" value={BillingInfo.pincode} onChange={handleInput} required />
                                        <div className="invalid-feedback">
                                            Please fill  the postal code
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="username" className="form-label" >Mobile number 1:</label>
                                        <div className="input-group">
                                            <span className="input-group-text">+91</span>
                                            <input type="tel" pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$" className="form-control" name="mobileNumber1" placeholder="enter your 10-digit  mobile number" value={BillingInfo.mobileNumber1} minlength="10" maxlength="10" onChange={handleInput} required />
                                            <div className="invalid-feedback">
                                                Your username is required.
                                            </div>
                                        </div>
                                        <label htmlFor="username" className="form-label" >Mobile number 2:</label>
                                        <div className="input-group">
                                            <span className="input-group-text">+91</span>
                                            <input type="tel" pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$" className="form-control" name="mobileNumber2" placeholder="enter your 10-digit  mobile  number" value={BillingInfo.mobileNumber2} minlength="10" maxlength="10" onChange={handleInput} />
                                            <div className="invalid-feedback">
                                                Your username is required.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                {BillingInfo.city==="Indore"?
                                <div className="col-md-5">
                                        <label htmlFor="city" className="form-label">Cash On Delivery <i class="fa-solid fa-wallet"></i></label>
                                        <select className="form-select" id="country" name='cash_on_delivery' placeholder='choose...' value={BillingInfo.cash_on_delivery} onChange={handleInput} required>
                                            <option>Not selected</option>
                                            <option>Cash On Delivery</option>
                                            <option>Pre-Paid <i class="fa fa-inr" aria-hidden="true"></i></option>
                                        </select>
                                </div>
                                :<></>
                                }
                                <hr className="my-4" />

                                

                                <button className=" btn btn-primary btn-md mb-4 ms-2" style={{ backgroundColor: "gray" }} onClick={() => { setdisplay(!display) }}>Check Items</button>
                                <button className=" btn btn-primary btn-md mb-4 float-end me-2" onClick={payment}>Continue to checkout</button>
                                { display?<div className=" container-fluid  col-12 col-lg-8 table-responsive mb-5">
                                    <table className="table text-center mb-0">
                                        <thead className="text-dark">
                                           <tr>

                                                <th className='d-sm-none'>Item</th>
                                                <th className=' d-none d-sm-block'>Item</th>
                                                <th>Price</th>
                                                <th className=' d-none d-sm-block'>Quantity</th>
                                                <th>Total</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        {x[0] === 'c' ?
                                            <tbody>
                                                {cart.map(Element => (
                                                    <CartItem key={Element.id} {...Element} />
                                                ))}
                                            </tbody>
                                            :
                                            <tbody>
                                                <CartItem id={productDetails._id} price={productDetails.price} images={productDetails.images[0].imgUrl} name={productDetails.name} total_cost={productDetails.price} Quantity={1} />
                                            </tbody>
                                        }

                                    </table>
                                </div>: <div></div>}
                            </form>
                        </div>
                        <div className='col-md-5 col-lg-4'>
                            {x[0] === 'c' ? <PaymentSummary /> : <SingleProductSummary price={productDetails.price} />}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
