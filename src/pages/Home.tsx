import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ISushiCart, ISortItems } from '../types/ISushi'

import {
  Categories,
  SortPopup,
  SushiBlock,
  SushiLoadingBlock,
} from '../components'

import { RootState, useGetSushiQuery } from '../redux'
import { addToCart } from '../redux/cartSlice'

const categoryNames: string[] = ['Классические', 'Запеченые', 'Темпура']
const sortItems: ISortItems[] = [
  { name: 'популярности', type: 'rating', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавит', type: 'name', order: 'asc' },
]

const Home: React.FC = () => {
  const [category, setCategory] = useState<number>(null)
  const [sort, setSort] = useState<ISortItems>(sortItems[0])
  const { data = [], isLoading } = useGetSushiQuery({ category, sort })

  const cartItems = useSelector((state: RootState) => state.cart.cart)
  const dispatch = useDispatch()
  const onSelectCategory = (index: number) => {
    setCategory(index)
  }

  const onSelectSortType = (type: ISortItems) => {
    setSort(type)
  }

  const handleAddSushiToCart = (obj: ISushiCart) => {
    dispatch(addToCart(obj))
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <SortPopup
          activeSortType={sort.type}
          items={sortItems}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">Все суши</h2>
      <div className="content__items">
        {!isLoading
          ? data.map((obj) => (
              <SushiBlock
                onClickAddSushi={handleAddSushiToCart}
                key={obj.id}
                addedCount={cartItems.find((e) => e.id === obj.id)}
                {...obj}
              />
            ))
          : [...Array(12)].map((_, index) => <SushiLoadingBlock key={index} />)}
      </div>
    </div>
  )
}

export default Home
