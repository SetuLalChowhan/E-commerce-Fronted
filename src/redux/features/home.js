import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const allProducts = createAsyncThunk(
  "/allProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const allProduct = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    default: [],
    filterProduct: [],
    pagePerPost: 6,
    currentPage: 1,
    numOfpage: 0,
    error: "",
  },
  reducers: {
    PageSetUp: (state, action) => {
      const pageNumber = action.payload;
      state.currentPage = pageNumber;
    },
    filterProducts: (state, action) => {
      state.currentPage=1
      let item = action.payload.toLowerCase();
      if (item === "guy's clothing") {
        item = "men's clothing";
      } else if (item === "lady's clothing") {
        item = "women's clothing";
      }

      item === "all products"
        ? (state.products = state.default)
        : (state.products = state.filterProduct.filter(
            (i) => i.category === item
          ));
    },
    priceListOrder: (state, action) => {
      if (action.payload === "High to Low") {
        state.products = state.products.sort((a, b) => b.price - a.price);
      } else if (action.payload === "Low to High") {
        state.products = state.products.sort((a, b) => a.price - b.price);
      } else {
        state.products = state.default;
      }
    },
    searchMethod:(state,action)=>{
      const searchValue = action.payload.toLowerCase()

      state.products = state.filterProduct.filter((item)=>item.title.toLowerCase().includes(searchValue))

    }
  },
  extraReducers: (builder) => {
    builder.addCase(allProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(allProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.default = action.payload;
      state.filterProduct = action.payload;
      state.error = "";
    });
    builder.addCase(allProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
  },
});

export const { PageSetUp, filterProducts, priceListOrder,searchMethod } = allProduct.actions;

export default allProduct.reducer;
