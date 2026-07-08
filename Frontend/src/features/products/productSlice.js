import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({ keyword, page=1 }, { rejectWithValue }) => {
    try {
      // merged with backend port in implement inside the vite folder port 6700 backend port

      //destructre the res data from the link http://localhost:6700/api/v1/products
      const link = keyword
        ? `/api/v1/products?keyword=${encodeURIComponent(keyword)}&page=${page}`
        : `/api/v1/products?page=${page}`;
      const { data } = await axios.get(link);
      console.log(data);
      return data; //return to reducer
    } catch (err) {
      return rejectWithValue(err.response?.data || "something went wrong");
    }
  },
);

export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      // merged with backend port in implement inside the vite folder port 6700 backend port

      //destructre the res data from the link http://localhost:6700/api/v1/products
      const { data } = await axios.get(`/api/v1/product/${id}`);

      console.log("API Response:", data);

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
    product: null,
    productPerPage:4,
    totalPages:0
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
        state.productPerPage = action.payload.productPerPage;
        state.totalPages= action.payload.totalPags;

      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.payload || "something went wrong";
      });

    builders
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.product = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        console.log("payload data", action.payload);
        state.loading = false;
        state.error = null;
        state.product = action.payload.product;

        console.log("Redux Product:", state.product);
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "something went wrong";
      });
  },
});
export const { removeErrors } = productSlice.actions;
export default productSlice.reducer;
