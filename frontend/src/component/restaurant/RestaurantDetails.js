import { Divider, FormControl, FormControlLabel, Grid2, RadioGroup, Typography } from '@mui/material'
import Radio from '@mui/material/Radio';
import React, { useEffect, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuCard from './MenuCard';
import { getRestaurantById, getRestaurantsCategory } from '../state/restaurant/Action';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { getMenUItemsByRestaurantId } from '../state/menu/Action';
import { findCart } from '../state/cart/Action';


const foodTypes = [
    { label: "All", value: "all" },
    { label: "Vegetarian only", value: "vegetarian" },
    { label: "Non-vegetarian", value: "non_vegetarian" },
    { label: "Seasonal", value: "seasonal" }
]

const RestaurantDetails = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const jwt = localStorage.getItem('jwt') || ''
    const {auth, restaurant, menu} = useSelector(store=>store)
    const [selectedCategory, setSelectedCategory] = useState("")
    const {id, city} = useParams()
    
    const [foodType, setFoodType] = useState("all")
    const [foodCategory, setFoodCategory] = useState("");

    useEffect(() => {
        dispatch(getRestaurantById(jwt, id))
        dispatch(getRestaurantsCategory(jwt, id))
        dispatch(findCart(jwt))
    }, [])

    useEffect(() => {
        dispatch(getMenUItemsByRestaurantId({
            jwt, 
            restaurantId: id, 
            vegetarian: foodType === 'vegetarian', 
            nonveg: foodType === 'non_vegetarian', 
            seasonal: foodType === 'seasonal', 
            foodCategory: selectedCategory}))
            dispatch(findCart(jwt))
    }, [selectedCategory, foodType])


    const handleFilter = (e) => {
        const { name, value } = e.target;
        if (name === 'food_type') {
            setFoodType(value);
        } else if (name === 'food_category') {
            setFoodCategory(value);
        }
        console.log(name, value);
    };

    const handleFilterCategory = (e, value) => {
        setSelectedCategory(value);
        console.log(e.target.value, e.target.name, value)
    };

    console.log("menu: ", menu)

    return (
        <div className='px-5 lg:px-20'>
            <section>
                <h3 className="text-gray-500 py-2 mt-10">Home/india/indian/fast food/3 </h3>
                <div>
                    <Grid2 container spacing={2}>
                        <Grid2 item xs={12}>
                            <img className='w-full h-[40vh] object-cover' src={restaurant.restaurant?.images[0]} alt='' />
                        </Grid2>
                        <Grid2 item xs={12} lg={6}>
                            <img className='w-full h-[40vh] object-cover' src={restaurant.restaurant?.images[1]} alt='' />
                        </Grid2>
                        
                    </Grid2>
                </div>
                <div className='pt-7 pb-7'>
                    <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.title}</h1>
                    <p className='text-gray-500 mt-1'>{restaurant.restaurant?.description}</p>
                    <div className='space-y-3 mt-3'>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <LocationOnIcon />
                            <span>Allahabad, Uttar Pradesh</span>
                        </p>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <CalendarTodayIcon />
                            <span>{restaurant.restaurant?.openingHours}</span>
                        </p>
                    </div>
                </div>
            </section>
            <Divider />
            <section className='pt-7 lg:flex relative'>
                <div className='space-y-10 lg:w-[20%] filter'>
                    <div className='box spy-y-5 lg:sticky top-28'>
                        <div className='pb-7'>
                            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                                Food Type
                            </Typography>
                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={handleFilter} name='food_type' value={foodType}>
                                    {foodTypes.map((item) =>
                                        <FormControlLabel
                                            key={item.value}
                                            value={item.value}
                                            control={<Radio />}
                                            label={item.label}
                                        />)}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider/>
                        <div className='pt-7'>
                            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                                Food Category
                            </Typography>
                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={handleFilterCategory} name='food_category' value={foodType}>
                                    {restaurant.categories.map((item) =>
                                        <FormControlLabel
                                            key={item}
                                            value={item.name}
                                            control={<Radio />}
                                            label={item.name}
                                        />)}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>

                <div className='space-y-5 lg:w-[80%] lg:pl-10'>
                    {menu.menuItems.map((item) => <MenuCard item={item}/>)}
                </div>

            </section>
        </div>
    )
}

export default RestaurantDetails
