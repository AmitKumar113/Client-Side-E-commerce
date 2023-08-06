import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import StepsCount from "./stepsCount";
import { COLORS } from '../../../constants/productConstant'
import { Link, useNavigate } from "react-router-dom";

export default function ConfirmShippingInfo() {
  // const shippingInfo = JSON.parse(localStorage.getItem("shipping-info")) || {};
  // const cart = useSelector((state) => state.cart);
  // const user = useSelector((state) => state.user);
  const navigate = useNavigate()

  const changeShppingInfo = (e) => {
    console.log("changeShppingInfo");

    const newShippingInfo = {
      address: document.querySelector('[name="address"]').value,
      city: document.querySelector('[name="city"]').value,
      state: document.querySelector('[name="state"]').value,
      country: document.querySelector('[name="country"]').value,
      pinCode: document.querySelector('[name="pincode"]').value,
      phoneNo: document.querySelector('[name="phoneNo"]').value,
    };

    localStorage.setItem("shipping-info", JSON.stringify(newShippingInfo));
  };

  const handleProceedBtn = () => {
    navigate('/order/payment')
  }
  //   e.preventDefault();
  //   console.log("@handleProceedBtn");
  //   const authToken = localStorage.getItem("auth-token");
  //   let shippingInfo = JSON.parse(localStorage.getItem("shipping-info")) || {};
  //   shippingInfo.pinCode = +shippingInfo.pinCode;
  //   shippingInfo.phoneNo = +shippingInfo.phoneNo;

  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": authToken,
  //       },
  //     };

  //     console.log(shippingInfo)
  //     console.log(cart.cartItems);
  //     let orderItems = [];
      
  //     cart.cartItems.map(item => {
          
  //       const orderItem = {
  //         name: item.name,
  //         price: item.price,
  //         quantity: item.quantity,
  //         image: item.image_url,
  //         product: item.id,
  //       };

  //       orderItems.push(orderItem);
  //   });
    
  //   console.log(orderItems);
  //     await axios.post(
  //       `http://localhost:5500/placeOrder`,
  //       { shippingInfo, orderItems , user: user._id },
  //       config
  //     );
  //   } catch (error) {
  //     console.log({ error });
  //   }

  //   // e.target.reset();
  //   alert("order placed successfully");
  //   // console.log(data.product)
  // };

  useEffect(()=>{
    let shippingInfo = JSON.parse(localStorage.getItem("shipping-info")) || {};
    
        document.querySelector('[name="address"]').value = shippingInfo.address || ''
        document.querySelector('[name="city"]').value  = shippingInfo.city || ''
        document.querySelector('[name="state"]').value = shippingInfo.state || ''
        document.querySelector('[name="country"]').value = shippingInfo.country || ''
        document.querySelector('[name="pincode"]').value = shippingInfo.pinCode || ''
        document.querySelector('[name="phoneNo"]').value = shippingInfo.phoneNo || ''
    
  })

  return (
    <div>
      <StepsCount op1={80} op2={80} op3={0}/>
      <div className="text-2xl text-center my-4">Confirm Shipping Details</div>
      <div className="flex justify-center min-h-[60vh]">
        <form
          onSubmit={(e) => handleProceedBtn(e)}
          onChange={() => changeShppingInfo()}
          className="flex flex-col w-full md:w-3/4 lg:w-1/2 p-4 bg-slate-300 h-full"
        >
          <div className="flex flex-wrap flex-col md:flex-row [&>*]:py-3 [&>*]:px-1 [&>*]:flex-1 box-border [&>*]:border-[1px] [&>*]:border-gray-600 m-3 gap-3">
            <input type="text" name="address" placeholder="Address" required></input>
            <input type="text" name="city" placeholder="City" required></input>
          </div>
          <div className="flex flex-wrap flex-col md:flex-row [&>*]:py-3 [&>*]:px-1 [&>*]:flex-1 box-border [&>*]:border-[1px] [&>*]:border-gray-600 m-3  gap-3">
            <input type="text" name="country" placeholder="Country" required></input>
            <input type="text" name="state" placeholder="State" required></input>
          </div>
          <div className="flex flex-wrap flex-col md:flex-row [&>*]:py-3 [&>*]:px-1 [&>*]:flex-1 box-border [&>*]:border-[1px] [&>*]:border-gray-600 m-3 gap-3">
            <input type="number" name="pincode" placeholder="Pin code" required></input>
            <input type="number" name="phoneNo" placeholder="Phone No" required></input>
          </div>
          <div className=" flex items-end flex-1">

          <div className="flex h-12 mx-2 my-2 justify-between flex-1 ">
            <Link to='/order/order-summary' className="w-1/4">
              <div className="bg-slate-700/40 w-full h-full text-center flex justify-center items-center cursor-pointer">Back</div>
            </Link>
            {/* <Link to='/order/payment' className={`w-1/4 border`}> */}
            <button type="submit" className={`bg-[${COLORS.MAIN_THEME_COLOR}] w-1/4 h-full`}>Proceed</button>
            {/* <div className={`bg-[${COLORS.MAIN_THEME_COLOR}] w-full h-full text-center flex justify-center items-center cursor-pointer`}>Proceed</div> */}
            {/* </Link> */}
          </div>
          </div>
        </form>
      </div>
    </div>
  );
}
