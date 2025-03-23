import React from 'react'

const CarouselItem = ({image, title}) => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <img className='w-23 h-20 sm:w-40 sm:h-40 lg:w-56 lg:h-56 rounded-full object-cover object-center' src={image} alt="" />
      <span className='py-5 font-sans text-lg text-gray-400'>{title}</span>
    </div>
  )
}

export default CarouselItem
