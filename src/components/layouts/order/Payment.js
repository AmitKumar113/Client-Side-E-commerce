import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { COLORS } from "../../../constants/productConstant";
import StepsCount from "./stepsCount";
import axios from "axios";
import { useSelector } from "react-redux/es/exports";
import { displayActionMessage } from "../popups/alert";

export default function Payment() {
  const shippingInfo = JSON.parse(localStorage.getItem("shipping-info")) || {};
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate()
  const handleProceedBtn = async (e) => {
    e.preventDefault();
    console.log("handleProceedBtn");
    const authToken = localStorage.getItem("auth-token");
    let shippingInfo = JSON.parse(localStorage.getItem("shipping-info")) || {};
    shippingInfo.pinCode = +shippingInfo.pinCode;
    shippingInfo.phoneNo = +shippingInfo.phoneNo;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      };

      console.log(shippingInfo);
      console.log(cart.cartItems);
      let orderItems = [];

      cart.cartItems.map((item) => {
        const orderItem = {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image_url,
          product: item.id,
        };

        orderItems.push(orderItem);
      });

      console.log(orderItems);
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/placeOrder`,
        { shippingInfo, orderItems, user: user._id },
        config
      );

      displayActionMessage("Order Placed", "success")
      navigate('/')
    } catch (error) {
      console.log({ error });
    }

    // e.target.reset();
    // alert("order placed successfully");
    // console.log(data.product)
  };

  return (
    <>
      <StepsCount op1={80} op2={80} op3={80} />
      <div className=" flex flex-col items-center h-[80vh]">
        <div>
          <p className="text-2xl my-4">Payment</p>
        </div>

        <div className="flex flex-col w-2/5 h-[75%] p-4 bg-slate-300">
          <ul className="w-full my-4 flex-1">
            <li className="w-full my-1">
              <label className="flex w-full py-4 border cursor-pointer bg-white">
                <input
                  type="radio"
                  name="payment-option"
                  value="A"
                  className="mx-4 cursor-pointer "
                />
                <span className="text-lg">Pay Later</span>
              </label>
            </li>
            <li className="w-full my-1 cursor-not-allowed">
              <label className="flex w-full py-4 border cursor-not-allowed bg-white">
                <input
                  type="radio"
                  name="payment-option"
                  value="A"
                  className="mx-4"
                />
                <span className="text-lg">Paytm</span>
                <span className="text-lg">/ G-Pay</span>
                <span className="text-lg">/ Paytm</span>
              </label>
            </li>
            <li className="w-full my-1">
              <label className="flex w-full py-4 border cursor-not-allowed bg-white">
                <input
                  type="radio"
                  name="payment-option"
                  value="A"
                  className="mx-4"
                />
                <span className="text-lg">Debit card</span>
                <span className="text-lg">/ Credit card</span>
              </label>
            </li>
          </ul>
          <div className="flex h-12 justify-between">
            <Link to="/order/shipping-details" className="w-1/4">
              <div className="bg-slate-700/40 w-full h-full text-center flex justify-center items-center cursor-pointer">
                Back
              </div>
            </Link>
            <div
              className={`bg-[${COLORS.MAIN_THEME_COLOR}] w-1/4 h-full text-center flex justify-center items-center cursor-pointer`}
              onClick={handleProceedBtn}
            >
              Proceed
            </div>
            {/* <button type="submit" className="">Proceed</button> */}
          </div>
        </div>
      </div>
    </>
  );
}
