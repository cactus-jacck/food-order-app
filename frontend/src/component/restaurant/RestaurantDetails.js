import { Divider, FormControl, FormControlLabel, Grid2, RadioGroup, Typography } from '@mui/material'
import Radio from '@mui/material/Radio';
import React, { useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuCard from './MenuCard';

const categories = [
    "Pizza",
    "Biryani",
    "Burger",
    "Chicken",
    "Rice"
]

const foodTypes = [
    { label: "All", value: "all" },
    { label: "Vegetarian only", value: "vegetarian" },
    { label: "Non-vegetarion", value: "non_vegetarian" },
    { label: "Seasonal", value: "seasonal" }
]

const menu = [1, 1, 1, 1, 1]
const RestaurantDetails = () => {
    const [foodType, setFoodType] = useState("all")

     const [foodCategory, setFoodCategory] = useState("");

    const handleFilter = (e) => {
        const { name, value } = e.target;
        if (name === 'food_type') {
            setFoodType(value);
        } else if (name === 'food_category') {
            setFoodCategory(value);
        }
        console.log(name, value);
    };
    return (
        <div className='px-5 lg:px-20'>
            <section>
                <h3 className="text-gray-500 py-2 mt-10">Home/india/indian/fast food/3 </h3>
                <div>
                    <Grid2 container spacing={2}>
                        <Grid2 item xs={12}>
                            <img className='w-full h-[40vh] object-cover' src='https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='' />
                        </Grid2>
                        <Grid2 item xs={12} lg={6}>
                            <img className='w-full h-[40vh] object-cover' src='https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='' />
                        </Grid2>
                        <Grid2 item xs={12}>
                            <img className='w-full h-[40vh] object-cover' src='https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='' />
                        </Grid2>
                    </Grid2>
                </div>
                <div className='pt-7 pb-7'>
                    <h1 className='text-4xl font-semibold'>El Chico</h1>
                    <p className='text-gray-500 mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, enim.</p>
                    <div className='space-y-3 mt-3'>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <LocationOnIcon />
                            <span>Allahabad, Uttar Pradesh</span>
                        </p>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <CalendarTodayIcon />
                            <span>Mon-Sun: 9:00 AM - 9:00 PM (Today)</span>
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
                                <RadioGroup onChange={handleFilter} name='food_category' value={foodCategory}>
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
                                <RadioGroup onChange={handleFilter} name='food_type' value={foodType}>
                                    {categories.map((item) =>
                                        <FormControlLabel
                                            key={item}
                                            value={item}
                                            control={<Radio />}
                                            label={item}
                                        />)}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>

                <div className='space-y-5 lg:w-[80%] lg:pl-10'>
                    {menu.map((item) => <MenuCard />)}
                </div>

            </section>
        </div>
    )
}

export default RestaurantDetails
