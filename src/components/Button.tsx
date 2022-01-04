import React from 'react'
import classNames from 'classnames'

interface Props {
  onClick?: () => void
  className: string
  outline: boolean
}

const Button: React.FC<Props> = ({ onClick, className, outline, children }) => {
  return (
    <button
      onClick={onClick}
      className={classNames('button', className, {
        'button--outline': outline,
      })}>
      {children}
    </button>
  )
}

export default Button
