export interface ISushiApi {
  id: number
  imageUrl: string
  name: string
  types: number[]
  sizes: number[]
  price: number
  category: number
  rating: number
}

export interface ISushiCart {
  name: string
  id: number
  imageUrl: string
  piecePrice: number
  price: number
  size: number
  type: string
}
export interface ISortItems {
  name: string
  type: string
  order: string
}
