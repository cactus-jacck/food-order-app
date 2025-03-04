import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Card } from '@mui/material';
import { Button } from '@mui/material';

const AddressCard = ({item, showButton, handleSelectAddress, cartItems}) => {
  return (
    <Card className='flex gap-5 w-64 p-5'>
        <HomeIcon />
        <div className='space-y-3 text-gray-500'>
            <h1 className='font-semibold text-lg text-white'>Home</h1>
            <p>
                {item.streetName}
            </p>
            <p>
                {item.city}, {item.state}
            </p>
            {showButton && 
            <Button 
            variant="outlined" 
            fullWidth 
            onClick={()=>handleSelectAddress(item)}
            disabled={!cartItems || cartItems.length === 0}
            >
              Place order here
            </Button>}
        </div>
    </Card>
  )
}

export default AddressCard
