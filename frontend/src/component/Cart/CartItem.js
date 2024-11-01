import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton } from '@mui/material'
import React from 'react'

const CartItem = () => {
  return (
    <div className='px-5'>
      <div className='lg:flex items-center lg:space-x-5'>
        <div>
            <img className='w-[5rem] h-[rem] object-cover' src="https://media.istockphoto.com/id/1345624336/photo/chicken-biriyani.jpg?s=1024x1024&w=is&k=20&c=bvTAMlq5A8Z5EhVjBn6D8eYOQS-rsuKmT9ToLkCc2Y4=" alt="" srcset="" />
        </div>
        <div className='flex items-center justify-between lg:w-[70]'>
            <div className='space-y-1 lg:space-y-3 w-full'>
                <p>Biryani</p>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center space-x-1'>
                        <IconButton>
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                        <div className='w-5 h-5 text-xs flex items-center justify-center'>
                            {5}
                        </div>
                        <IconButton>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
