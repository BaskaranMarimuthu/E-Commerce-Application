import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
// import CartItems from "../../Cart/cartItem";
// import { removeErrors } from "../user/userSlice";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  loading: false,
  error: null,
  success: false,
  message: null,
};

export const addCartItems = createAsyncThunk(
  "cart/addtocart",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      console.log("Thunk started");
      const { data } = await axios.get(`/api/v1/product/${id}`);
      console.log("api responded", data);
      return {
        product: data.product._id,
        name: data.product.name,
        description: data.product.description,
        price: data.product.price,
        image: data.product.image?.[0]?.url,
        stock: data.product.stock,
        quantity,
      };
    } catch (error) {
      console.log("Thunk Error:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          "Error occured while add the cart items",
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeErrors: (state) => {
      state.error = null;
      state.success = false;
    },
    removeMessage: (state) => {
      state.message = null;
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (i) => i.product !== action.payload,
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCartItems.fulfilled, (state, action) => {
        // console.log("FULFILLED reducer called");
        // console.log(action.payload);
        const item = action.payload;
        const existingItem = state.cartItems.find(
          (i) => i.product === item.product,
        );
        if (existingItem) {
          existingItem.quantity = item.quantity;
          state.message = `updated ${item.name} quantity in the cart`;
        } else {
          state.cartItems.push(item);
          state.message = `${action.payload.name} added to cart`;
        }
        state.loading = false;
        state.error = null;
        state.success = true;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(addCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "something went wrong plaese try again later";
      });
  },
});

export const { removeErrors, removeMessage, removeItemFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
