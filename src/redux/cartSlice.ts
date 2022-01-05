import { createSlice } from '@reduxjs/toolkit'
import { ISushiCart } from '../types/ISushi'

interface ICartState {
  cart: ISushiCart[]
  totalPrice: number
  totalCount: number
  piecePrice: number
}

const initialState: ICartState = {
  cart: [],
  totalPrice: 0,
  totalCount: 0,
  piecePrice: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let inCart = state.cart.find((e) => e.id === action.payload.id)
      if (inCart && inCart.type === action.payload.type) {
        state.cart = state.cart.map((e) =>
          e.id === action.payload.id
            ? {
                ...e,
                price: e.price + action.payload.price,
                size: e.size + action.payload.size,
              }
            : e,
        )
      }
      if (inCart && inCart.type !== action.payload.type) {
        state.cart = state.cart
          .filter((e) => e.id !== action.payload.id)
          .concat(action.payload)
      }
      if (!inCart) {
        state.cart.push(action.payload)
      }
      state.totalPrice = state.cart.reduce((sum, cur) => sum + cur.price, 0)
      state.totalCount = state.cart.reduce((sum, cur) => sum + cur.size, 0)
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((e) => e.id !== action.payload)
      state.totalPrice = state.cart.reduce((sum, cur) => sum + cur.price, 0)
      state.totalCount = state.cart.reduce((sum, cur) => sum + cur.size, 0)
    },
    removeAllItems: (state) => {
      state.cart = []
      state.totalPrice = state.cart.reduce((sum, cur) => sum + cur.price, 0)
      state.totalCount = state.cart.reduce((sum, cur) => sum + cur.size, 0)
    },
    plusFour: (state, action) => {
      state.cart = state.cart.map((e) =>
        e.id === action.payload
          ? { ...e, size: e.size + 4, price: e.price + e.piecePrice }
          : e,
      )
      state.totalPrice = state.cart.reduce((sum, cur) => sum + cur.price, 0)
      state.totalCount = state.cart.reduce((sum, cur) => sum + cur.size, 0)
    },
    minusFour: (state, action) => {
      state.cart = state.cart.map((e) =>
        e.id === action.payload
          ? { ...e, size: e.size - 4, price: e.price - e.piecePrice }
          : e,
      )
      state.cart = state.cart.filter((e) => e.size >= 4)
      state.totalPrice = state.cart.reduce((sum, cur) => sum + cur.price, 0)
      state.totalCount = state.cart.reduce((sum, cur) => sum + cur.size, 0)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, removeAllItems, plusFour, minusFour } =
  cartSlice.actions

export default cartSlice.reducer
