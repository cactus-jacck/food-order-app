import { Card, Chip, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToFavorites, getUser} from "../state/authentication/Action";
import { isPresentInFavorites } from '../config/login';
import { ContentPasteSearchOutlined } from '@mui/icons-material';

const RestaurantCard = ({item}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const jwt = localStorage.getItem('jwt') || ''
    const {auth} = useSelector(store=>store)

    const handleAddToFavorites = () => {
        dispatch(addToFavorites({jwt, restaurantId:item.restaurantId? item.restaurantId : item.id}))
        dispatch(getUser(jwt))
    }

    const handleNavigateToRestaurant = () => {
        if(item.open){
            navigate(`/restaurant/${item.city}/${item.title}/${item.id}`)
        }
    }

    return (
        <Card className='w-[18rem] h-[18rem] flex flex-col productCard'>
            <div className={`${true ? 'cursor-pointer' : "cursor-not-allowed"} relative w-full h-[10rem]`}>
                <img className='w-full h-full rounded-t-md object-cover'
                    src={item.images} alt='' />
                <Chip size='small'
                    className='absolute top-2 left-2'
                    color={item.open ? "success" : "error"}
                    label={item.open ? "open" : "closed"}
                />
            </div>
            <div className='p-4 flex-grow flex flex-col justify-between'>
               <div className='space-y-1 flex-grow'>
                <p onClick={handleNavigateToRestaurant} className='font-semibold text-lg cursor-pointer'>{item.title}</p>
                    <p className='text-gray-500 text-sm line-clamp-2'>
                        {item.description}
                    </p>
                </div>
                <div className='flex justify-end'>
                    <IconButton onClick={handleAddToFavorites}>
                        {isPresentInFavorites(auth.favorites, item)?<FavoriteIcon/>:<FavoriteBorderIcon/>}
                    </IconButton>
                </div> 
            </div>
        </Card>
    )
}

export default RestaurantCard
