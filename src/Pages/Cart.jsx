import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import  { totalPrice,increment,decrement, DeleteProduct } from "../redux/features/cart";
import {toast} from 'react-hot-toast'

const Cart = () => {

  const { carts,subtotal,home_delivery } = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const handleDelete=(value)=>{
    dispatch(DeleteProduct(value))
    toast.success("Product Deleted")
  }
  useEffect(()=>{
    dispatch(totalPrice())
  },[carts])
  return (
    <div className="flex flex-col lg:flex-row  mt-6 ">
      <div className="flex flex-col gap-6 lg:ml-48">
        {carts?.map((item, index) => {
          return (
            <div
              key={index}
              className="flex  shadow-md
              rounded-md justify-between lg:w-[500px] "
            >
              <div className=" w-28 object-contain ">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="flex flex-col gap-6 w-64">
                <h1 className="font-semibold">{item.title}</h1>
                <div className="flex justify-between mb-5">
                  <div className=" w-36  flex justify-between text-white">
                    <h1 className="font-semibold text-black">Qty: </h1>
                    <div className=" ml-7 flex w-28  text-lg font-semibold rounded-md ">
                      <button onClick={()=>{dispatch(decrement(item))}} className=" w-8 font-semibold bg-blue-600 duration-700 hover:opacity-80 hover:scale-125 rounded-md">
                        {" "}
                        -{" "}
                      </button>
                      <p className=" ml-4 w-6 rounded-md text-black">
                        {item.qty}
                      </p>
                      <button onClick={()=>{dispatch(increment(item))}} className="w-8 font-semibold bg-blue-600 duration-700 hover:opacity-80 hover:scale-125 rounded-md">
                        +
                      </button>
                    </div>
                  </div>
                  <div className="font-semibold">{item.price}$</div>
                </div>
              </div>
              <div className="cursor-pointer" onClick={()=>{handleDelete(item)}}>
                <IoMdClose size={25} />
              </div>
            </div>
          );
        })}
      </div>
      {carts.length===0?<div className="flex justify-center items-center text-2xl md:text-5xl font-semibold lg:ml-[550px] mt-72">
        <h1>Your Cart is Empty</h1>
      </div>:
      <div className=" mr-96 mt-10  w-full  h-40 rounded-md shadow-md  lg:mt-32 sticky top-14 lg:ml-64 ">
      <div className="flex flex-col mt-2 ">
        <div className="flex justify-between">
          <h1 className="text-lg">Subtotal:</h1>
          <h1 className="text-xl font-semibold mr-6">{subtotal.toFixed(1)}$</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-lg">Home Delivery:</h1>
          <h1 className="text-xl font-semibold mr-6">{home_delivery}$</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-lg">Total:</h1>
          <h1 className="text-xl font-semibold mr-6">{(subtotal+home_delivery).toFixed(1)}$</h1>
        </div>

        <button className=" w-full h-10 mt-4 text-white font-semibold bg-blue-600 duration-700 hover:opacity-80 rounded-md ">
          Confirm Order
        </button>
      </div>
    </div>}
    </div>
  );
};

export default Cart;
