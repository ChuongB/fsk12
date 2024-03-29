// counterSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./api";
import { toast } from "react-toastify";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  products: [],
  searchedProducts: [],
  loading: false,
  cart: [],
  isLoggedIn: false,
  currentUser: null,
  draftProduct: null,
};

const waiting = (timer) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, timer);
  });
};
// asynchronous function with createAsyncThunk
export const getProductAsync = createAsyncThunk(
  "product/fetchProducts",
  async (amount, { rejectWithValue }) => {
    try {
      const url = `${BASE_URL}/products`;
      const data = await fetch(url).then((res) => res.json());
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const addProductAsync = createAsyncThunk(
  "product/addProducts",
  async (payload, { rejectWithValue }) => {
    try {
      const url = `${BASE_URL}/products`;

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      };
      const data = await fetch(url, requestOptions).then((res) => res.json());
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const editProductAsync = createAsyncThunk(
  "product/editProducts",
  async (payload, { rejectWithValue }) => {
    try {
      const url = `${BASE_URL}/products/${payload.id}`;

      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      };
      const data = await fetch(url, requestOptions).then((res) => res.json());
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "product/deleteProducts",
  async (product, { rejectWithValue }) => {
    try {
      const url = `${BASE_URL}/products/${product.id}`;

      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const data = await fetch(url, requestOptions).then((res) => res.json());
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
      await waiting(1000);
      const url = `${BASE_URL}/users`;
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

export const signupAsync = createAsyncThunk(
  "user/signup",
  async (payload, { rejectWithValue }) => {
    try {
      await waiting(1000);
      const url = `${BASE_URL}/users`;
      const res = await fetch(`${url}?email=${payload.email}`).then((res) =>
        res.json()
      );

      if (res && res.length > 0) {
        return rejectWithValue("this email already exists");
      }

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      };
      const data = await fetch(url, requestOptions).then((res) => res.json());
      return data;
    } catch (err) {
      return rejectWithValue("create user failed");
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
      } else if (find && find.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== product.id);
      }
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
    },
    saveDraft: (state, action) => {
      state.draftProduct = action.payload;
    },
    searchProducts: (state, action) => {
      const finds = state.products.filter((item) =>
        item.title.includes(action.payload)
      );

      state.searchedProducts = finds;
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
        state.searchedProducts = action.payload;
      })
      .addCase(getProductAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loginAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        toast("Login successful");
        state.isLoggedIn = true;
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        toast.error("Login failed");
        state.isLoggedIn = false;
        state.loading = false;
      })
      .addCase(signupAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        toast("Create account successful");
        state.loading = false;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        toast.error(action.payload);
        state.loading = false;
      })
      .addMatcher(api.endpoints.getProducts.matchFulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});
export const {
  setProduct,
  addToCart,
  increaseItem,
  decreaseItem,
  logout,
  searchProducts,
} = productSlice.actions;
export default productSlice.reducer;
