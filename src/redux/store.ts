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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
