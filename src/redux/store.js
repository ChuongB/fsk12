// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import productReducer from "./productSlice";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    // Tạo thêm slice từ api
    [api.reducerPath]: api.reducer,
    counter: counterReducer,
    product: productReducer,
  },
  // other options e.g middleware, go here
  // Thêm cấu hình middleware để dùng được các chức năng của RTK Query như caching, invalidation, polling, ...
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
