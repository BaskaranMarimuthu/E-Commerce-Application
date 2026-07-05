import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (payload, { rejectWithValue }) => {
    try {
      // merged with backend port in implement inside the vite folder port 6700 backend port
      const link = "/api/v1/products";
      //destructre the res data from the link http://localhost:6700/api/v1/products
      const { data } = await axios.get(link);
      console.log(data);
      return data; //return to reducer
    } catch (err) {
      return rejectWithValue(err.response?.data || "something went wrong");
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        console.log("payload data", action.payload);
        state.loading = false;
        state.error = null;
        state.products = action.payload.products;
        state.productCount = action.payload.productCount;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "something went wrong";
      });
  },
});
export const { removeErrors } = productSlice.actions;
export default productSlice.reducer;
