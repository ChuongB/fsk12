import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export const api = createApi({
  // Tương tự tên Slice khi tạo Slice thông thường
  reducerPath: "api",

  // Cấu hình chung cho tất cả request
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  // Các endpoints (lệnh gọi request)
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/products`,
    }),
  }),
});

// Export ra ngoài thành các hooks để sử dụng theo cú pháp use + endpoints (login) + endpoints type (mutation)
export const { useGetProductsQuery } = api;
