// counterSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./api";
import { toast } from "react-toastify";
// import { fetchCount } from "./counterAPI";
const initialState = {
  products: [],
  loading: false,
  cart: [],
  isLoggedIn: false,
};

// asynchronous function with createAsyncThunk
export const getProductAsync = createAsyncThunk(
  "product/fetchProducts",
  async (amount, { rejectWithValue }) => {
    try {
      const url = "http://localhost:3004/products";
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// asynchronous function with createAsyncThunk
export const loginAsync = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const url = "http://localhost:3004/users";
      const res = await fetch(url);
      const users = await res.json();
      const find = users.find((user) => user.email === payload.email);
      if (!find) {
        return rejectWithValue("not find user");
      }
      if (find && find.password === payload.password) {
        return find;
      }
      return rejectWithValue("not find user");
    } catch (err) {
      return rejectWithValue("not find user");
    }
  }
);

// Redux Toolkit slice
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
    },
    addToCart: (state, action) => {
      const product = action.payload;

      const find = state.cart.find((item) => item.id === product.id);

      if (!find) {
        state.cart.push({ ...product, quantity: 1 });
      }

      if (find) {
        find.quantity += 1;
      }
    },
    increaseItem: (state, action) => {
      const product = action.payload;
      const find = state.cart.find((item) => item.id === product.id);
      if (find) {
        find.quantity += 1;
      }
    },
    decreaseItem: (state, action) => {
      const product = action.payload;
      const find = state.cart.find((item) => item.id === product.id);
      if (find && find.quantity > 1) {
        find.quantity -= 1;
      }
      if (find && find.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== product.id);
      }
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductAsync.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        // state.products = [];
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        toast("Login successful");
        state.isLoggedIn = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        toast.error("Login failed");
        state.isLoggedIn = false;
      })
      .addMatcher(api.endpoints.getProducts.matchFulfilled, (state, action) => {
        // Lưu thông tin user vào state
        state.products = action.payload;
      });
  },
});
export const { setProduct, addToCart, increaseItem, decreaseItem, logout } =
  productSlice.actions;
export default productSlice.reducer;
