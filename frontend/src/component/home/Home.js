import React, { useEffect } from 'react'
import "./Home.css"
import MulitItemCarousel from './MulitItemCarousel'
import RestaurantCard from '../restaurant/RestaurantCard'
import Auth from '../auth/Auth'
import { CircularProgress, Box } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'
import { getAllRestaurantsAction } from '../state/restaurant/Action'
import { useNavigate } from 'react-router-dom'
import { findCart } from '../state/cart/Action'

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const jwt = localStorage.getItem('jwt')|| '';
    const {restaurant, loading} = useSelector(store=>store)

    useEffect(() => {
        dispatch(getAllRestaurantsAction(jwt))
    }, [])

    return(
        <div className='pb-10'>
            <section className='banner -z-50 relative flex flex-col justify-center items-center'>
                <div className='w-[50vw] z-10 text-center'>
                    <p className='text-6xl lg:text-8xl shadow-lg font-bold z-10 py-5'>
                        Eatzy
                    </p>
                    <p className='z-10 italic text-gray-300 text-xl lg:text-4xl'>order. eat. repeat.</p>
                </div>
                <div className='cover absolute top-0 left-0 right-0'>

                </div>
                <div className='fadeout'>

                </div>

            </section>
            <section className='p-10 lg:py-10 lg:px-20'>
                <p className='text-2xl font-semibold text-white-400 py-3 pb-10'>Top Meals</p>
                <MulitItemCarousel />
            </section>
            <section className='px-5 lg:px-20 pt-10'>
                <h1 className='text-2xl font-semibold text-white-400 pb-8'>
                    Order From Our Handpicked Favourites
                </h1>
                <div className='flex flex-wrap items-center justify-around gap-5'>
                    {restaurant.loading ?  (
                        <Box className="flex justify-center items-center w-full h-40">
                        <CircularProgress size={50} />
                    </Box>
                    ) : (
                        restaurant.restaurants.map((item) => <RestaurantCard item={item}/>)
                    )}
                </div>
            </section>
            <Auth />
        </div>
    )
}

export default Home