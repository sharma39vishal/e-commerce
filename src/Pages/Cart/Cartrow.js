import React, { useState } from 'react'


export default function Cartrow(props) {
    // 2 state to get the status of quantity and total amount 

    const [quantity,setquantity]=useState(1);
    const [total,updatetotal]=useState(props.rate);
     function update(event){
      setquantity(event.target.value);
     }
     // increment function
     function increment()
     {
       setquantity(quantity+1);
       console.log(quantity);
       updatetotal((quantity+1)*props.rate)
       console.log({total});
     }
     // increment function
     function decrement()
     {
        setquantity(quantity-1);
        if(quantity===0)
        setquantity(0);
        updatetotal((quantity-1)*props.rate)
     }
    return (
        // row from bootstrap.
        <>
            <tr style={{border:"1px"}}>
                <td className="align-middle " ><img src="./dal_image1.jpg" alt="" style={{ width: "50px" , padding:"5px"}} />  {props.title}</td>
                <td className="align-middle" value={props.rate}>{props.rate}</td>
                <td className="align-middle">
                    <div className="d-flex align-items-center input-group quantity mx-auto" style={{ width: "100px" }}>
                        <div className="input-group-btn">
                            <button className="btn btn-sm btn-primary btn-minus" onClick={decrement} >
                               -
                            </button>
                        </div>
                        <input type="text" className="form-control form-control-sm bg-secondary text-center "  value={quantity} onChange={update} />
                        <div className="input-group-btn">
                            <button  className="btn btn-sm btn-primary btn-plus" onClick={increment}>
                               +
                            </button>
                        </div>
                    </div>
                </td>
                <td className="align-middle" value={total}>{total}</td>
                <td className="align-middle"><button className="btn btn-sm btn-primary">☒</button></td>
            </tr>
        </>
    )
}
