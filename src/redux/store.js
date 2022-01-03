import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'

import { sushiApi } from './sushiApi'

export const store = configureStore({
  reducer: {
    [sushiApi.reducerPath]: sushiApi.reducer,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sushiApi.middleware),
})
