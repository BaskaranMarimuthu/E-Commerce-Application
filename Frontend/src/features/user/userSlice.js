import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
// get register
export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/v1/register", userData, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "registeration failed please try again",
      );
    }
  },
);

// profile
export const loadUser = createAsyncThunk(
  "user/loaduser",
  async (__dirname, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/profile");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to load user profile",
      );
    }
  },
);

//login
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/login",
        { email, password },
        config,
      );
       console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: localStorage.getItem("isAuthenticated") == "true",
    message: null,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
        //store in local storage
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem(
          "isAuthenticated",
          JSON.stringify(state.isAuthenticated),
        );
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Registration failed please try again";
        state.user = null;
        state.isAuthenticated = false;
      });
    //login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
        //store in local storage
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem(
          "isAuthenticated",
          JSON.stringify(state.isAuthenticated),
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Registration failed please try again";
        state.user = null;
        state.isAuthenticated = false;
      });

    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {

        state.loading = false;
        state.error = null;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem(
          "isAuthenticated",
          JSON.stringify(state.isAuthenticated),
        );
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Registration failed please try again";
        state.user = null;
        state.isAuthenticated = false;
        if (action.payload?.statusCode === 401) {
          state.user = null;
          state.isAuthenticated = false;
          localStorage.removeItem("user");
          localStorage.removeItem("isAuthenticated");
        }
      });
  },
});

export const { removeErrors, removeSuccess } = userSlice.actions;
export default userSlice.reducer;
