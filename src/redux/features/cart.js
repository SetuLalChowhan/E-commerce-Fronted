import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const Cart = createSlice({
  name: "products",
  initialState: {
    loading: false,
    carts: [],
    error: "",
    subtotal:0,
    home_delivery:2
  },
  reducers: {
    addtoCart: (state, action) => {
      const item = action.payload;
      const itemExist = state.carts.find((i) => i.id === item.id);
      if (itemExist) {
        state.carts.forEach((i) => {
          if (i.id === item.id) i.qty += 1;
        });
      } else {
        state.carts.push(item);
      }
    },
    totalPrice:(state)=>{
      state.subtotal = state.carts.reduce((accu,item)=>{ return(accu+=item.price*item.qty)},0)
    },
    increment:(state,action)=>{
      const item=action.payload
      state.carts.forEach((i)=>{
        if(i.id===item.id){
          i.qty+=1
        }

      })
    },
    decrement:(state,action)=>{
      const item=action.payload
      state.carts.forEach((i)=>{
        if(i.id===item.id){
          i.qty==0?i.qty=0:i.qty-=1
        }

      })
    },
    DeleteProduct:(state,action)=>{
      const item=action.payload
      state.carts=state.carts.filter((i)=> i.id!=item.id)
    }
  },
});

export const { addtoCart,totalPrice,increment,decrement,DeleteProduct} = Cart.actions;

export default Cart.reducer;
