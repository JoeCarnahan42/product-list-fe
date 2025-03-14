import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "getProducts",
  async ({ category, query, price, page } = {}) => {
    const response = await axios.get("http://localhost:8000/products", {
      params: {
        page,
        price,
        query,
        category,
      },
    });
    console.log(response.data);
    return response.data;
  }
);

const apiSlice = createSlice({
  name: "Products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Loading...");
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        console.log("Complete!");
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log("Failed");
        console.log(action.error.message);
      });
  },
});

export default apiSlice.reducer;
