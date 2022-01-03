import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const sushiApi = createApi({
  reducerPath: 'sushiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
  }),
  endpoints: (builder) => ({
    getSushi: builder.query({
      query: (link) =>
        `sushi?${
          link.category !== null ? `category=${link.category}` : ''
        }&_sort=${link.sort.type}&_order=${link.sort.order}`,
    }),
  }),
})

export const { useGetSushiQuery } = sushiApi
