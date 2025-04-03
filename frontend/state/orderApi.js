import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:9009/api/pizza/"}),
  tagTypes: ['Orders'],
  endpoints: builder => ({
    getOrders: builder.query({
      query: () => 'history',
      providesTag: ['Orders']
    }),
    createOrder: builder.mutation({
      query: ({fullName, size, toppings}) => ({
        url: 'order',
        method: 'POST',
        body: { fullName, size, toppings }
      }),
      invalidatesTags: ['Orders']
    })
  })
})

export const {
  useGetOrdersQuery, useCreateOrderMutation
} = ordersApi