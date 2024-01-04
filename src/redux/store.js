import { configureStore } from "@reduxjs/toolkit";
import allProduct from "./features/home";
import Cart from "./features/cart";

export default configureStore({
  reducer:{
    allProducts :allProduct,
    cart:Cart
    
  }

})
