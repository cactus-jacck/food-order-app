import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Card } from '@mui/material';
import { Button } from '@mui/material';

const ProfileAddressCard = ({ item, showButton, handleSelectAddress, cartItems }) => {
  return (
    <Card className='flex gap-5 w-64 p-5'>
      <HomeIcon />
      <div className='space-y-3 text-gray-500'>
        <h1 className='font-semibold text-lg text-white'>
          {item.addressType === 'OTHER' ?
          item.customAddressType : item.addressType}</h1>
        <p>
          {item.streetName}
        </p>
        <p>
          {item.city}, {item.state}, {item.postalCode}
        </p>
      </div>
    </Card>
  )
}

export default ProfileAddressCard
