import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ISushiApi } from '../types/ISushi'
interface ILink {
  category: number
  sort: {
    type: string
    order: string
  }
}

export const sushiApi = createApi({
  reducerPath: 'sushiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://61bb7bc9e943920017784ee6.mockapi.io/',
  }),
  endpoints: (builder) => ({
    getSushi: builder.query<ISushiApi[], ILink>({
      query: (link) =>
        `sushi?${
          link.category !== null ? `category=${link.category}` : ''
        }&sortby=${link.sort.type}&order=${link.sort.order}`,
    }),
  }),
})

export const { useGetSushiQuery } = sushiApi
