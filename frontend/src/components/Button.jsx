import React from 'react'

const Button = ({text, onClick}) => {
  return (
    <button className='w-full h-10 flex items-center justify-center text-lg bg-black text-white my-3 rounded-md' onClick={onClick}>{text}</button>
  )
}

export default Button