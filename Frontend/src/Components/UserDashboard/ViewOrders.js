import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../Context/auth_context";
import ViewOrderComponent from "./ViewOrderComponent";
const ViewOrders = () => {
  // const [dataSource, setDataSource] = useState([]);
  // const Callingapi = async () => {
  //   await axios.get("/admin/order").then((res) => {
  //     setDataSource(res.data);
  //     //   setstatus(res.data.order_status);
  //     //   console.log(res.data.order_status);

  //       // console.log(res.data);
  //     console.log("view order",res.data);
  //   });
  //   useEffect(() => {
  //     Callingapi();
  //   }, []);
  // };
  const { userId, loggedIn } = useContext(AuthContext);
  const [id, setid] = useState();
  const [stats, setstatus] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  // console.log(userId);
  const callapi = async () => {
    // console.log('first')
    await axios.get(`/order/personorder/${userId}`).then((res) => {
      setDataSource(res.data);
      console.log(res.data);
    });
  };
  useEffect(() => {
    callapi();
  }, []);
  return (
    <div className="viewOrderSection container">
      <h1 className="fs-1 text-center">Your Orders</h1>
      <table class="table">
        <thead>
          <tr className="text-center"> 
            <th className="col-6">Orders</th>
            <th className="col-3">details</th>
            <th className="col-3">Track</th>
          </tr>
        </thead>
      <tbody>
       { console.log("hello" , dataSource)}
        {dataSource.map((currelem)=>{
       return  <ViewOrderComponent id={currelem._id} status={currelem.order_status}/>
        })}
      </tbody>
      </table>
    </div>
  );
};

export default ViewOrders;
