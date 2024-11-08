import React from 'react'
import { Button, Card } from '@mui/material'

const OrderCard = () => {
  return (
    <Card className='flex justify-normal items-center p-5'>
      <div className='flex items-center space-x-5'>
        <img className='h-16 w-16'
        src="https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
        alt="" 
        srcset="" />
        <div>
          <p>Steak</p>
          <p>320</p>
        </div>
      </div>
      <div>
        <Button disabled className='curson-not-allowed'> Completed </Button>
      </div>
    </Card>
  )
}

export default OrderCard
