import { Card, CardActionArea, CardContent, CardMedia, Icon, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = () => {
  return (
    <div>
      <Card sx={{width: 345}}>
        <CardMedia 
        sx={{height:345}}
        image='https://images.news9live.com/wp-content/uploads/2024/09/Karan-Aujla-concert-Tickets-price-venue-and-other-details.png?q=50&w=1200'
        />
        <CardContent>
            <Typography variant='h5'>
                Wembley Stadium
            </Typography>
            <Typography variant='body2'>
                Karan Aujla live concert
            </Typography>
            <div className='py-2 space-y-2'>
                <p>{"Mumbai"}</p>
                <p className='text-sm text-blue-500'>Friday: 8 pm</p>
                <p className='text-sm text-red-500'>12 pm</p>
            </div>
        </CardContent>
        {true && <CardActionArea>
            <IconButton>
                <DeleteIcon />
            </IconButton>
        </CardActionArea>}
      </Card>
    </div>
  )
}

export default EventCard
