import React from 'react'
import { Button, Card } from '@mui/material'

const OrderCard = ({item, order}) => {
  console.log("item ", item)
  return (
    <Card className='flex justify-normal items-center p-5'>
      <div className='flex items-center space-x-5'>
        <img className='h-16 w-16'
        src={item.food.images[0]} 
        alt="" 
        srcset="" />
        <div>
          <p>{item.food.name}</p>
          <p>₹{item.food.price}</p>
        </div>
      </div>
      <div>
        <Button disabled className='curson-not-allowed'> {order.orderStatus} </Button>
      </div>
    </Card>
  )
}

export default OrderCard
