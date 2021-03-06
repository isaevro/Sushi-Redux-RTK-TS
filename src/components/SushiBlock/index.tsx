import React from 'react'
import classNames from 'classnames'
import Button from '../Button'
import { ISushiCart } from '../../types/ISushi'
interface Props {
  id: number
  name: string
  imageUrl: string
  price: number
  types: number[]
  sizes: number[]
  onClickAddSushi: (obj: ISushiCart) => void
  addedCount: ISushiCart | undefined
}

const SushiBlock: React.FC<Props> = ({
  id,
  name,
  imageUrl,
  price,
  types,
  sizes,
  onClickAddSushi,
  addedCount,
}) => {
  const availableTypes = ['с васаби', 'без васаби']
  const availableSizes = [4, 8, 16]

  const [activeType, setActiveType] = React.useState(types[0])
  const [activeSize, setActiveSize] = React.useState(0)
  const onSelectType = (index: number) => {
    setActiveType(index)
  }

  const onSelectSize = (index: number) => {
    setActiveSize(index)
  }

  const onAddSushi = () => {
    const obj = {
      piecePrice: price,
      id,
      name,
      imageUrl,
      price: (price / 4) * availableSizes[activeSize],
      size: availableSizes[activeSize],
      type: availableTypes[activeType],
    }

    onClickAddSushi(obj)
  }

  return (
    <div className="sushi-block">
      <img className="sushi-block__image" src={imageUrl} alt="Sushi" />
      <h4 className="sushi-block__title">{name}</h4>
      <div className="sushi-block__selector">
        <ul>
          {availableTypes.map((type, index) => (
            <li
              key={type}
              onClick={() => onSelectType(index)}
              className={classNames({
                active: activeType === index,
                disabled: !types.includes(index),
              })}>
              {type}
            </li>
          ))}
        </ul>
        <ul>
          {availableSizes.map((size, index) => (
            <li
              key={size}
              onClick={() => onSelectSize(index)}
              className={classNames({
                active: activeSize === index,
                disabled: !sizes.includes(size),
              })}>
              {size} шт.
            </li>
          ))}
        </ul>
      </div>
      <div className="sushi-block__bottom">
        <div className="sushi-block__price">
          {(price / 4) * availableSizes[activeSize]} ₽
        </div>
        <Button onClick={onAddSushi} className="button--add" outline={true}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount && <i>{addedCount.size}</i>}
        </Button>
      </div>
    </div>
  )
}

export default SushiBlock
