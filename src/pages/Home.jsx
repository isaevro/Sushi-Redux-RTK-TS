import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  Categories,
  SortPopup,
  SushiBlock,
  SushiLoadingBlock,
} from '../components'

import { useGetSushiQuery } from '../redux'
import { addToCart } from '../redux/cartSlice'

const categoryNames = ['Классические', 'Запеченые', 'Темпура']
const sortIems = [
  { name: 'популярности', type: 'rating', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавит', type: 'name', order: 'asc' },
]

function Home() {
  const [category, setCategory] = useState(null)
  const [sort, setSort] = useState(sortIems[0])
  const { data = [], isLoading } = useGetSushiQuery({ category, sort })

  const cartItems = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()
  console.log(cartItems)
  const onSelectCategory = (index) => {
    setCategory(index)
  }

  const onSelectSortType = (type) => {
    setSort(type)
  }

  const handleAddSushiToCart = (obj) => {
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
          items={sortIems}
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
