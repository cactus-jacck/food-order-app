import React, { useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import CarouselItem from './CarouselItem';
import topMeals from "./TopMeals.js";
import { useDispatch, useSelector } from 'react-redux';
import { getAllMenuItems } from '../state/menu/Action.js';
import { useNavigate } from 'react-router-dom';

const MulitItemCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
  };
  const jwt = localStorage.getItem('jwt')|| '';
  const dispatch = useDispatch();
  const {menu} = useSelector(store=>store)
  console.log("menu items ", menu)
  const navigate = useNavigate()

  useEffect(() => {
        console.log("jwt ", jwt)
        dispatch(getAllMenuItems(jwt))
      }, [])

  const navigateToRestaurant = (item) => {
    console.log("navigating to restaurant")
    navigate(`/restaurant/${item.restaurantCity}/${item.restaurantName}/${item.restaurantId}`)
  }

  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
        {[...menu.menuItems].reverse().map((item, index) => (
          <div
            key={index}
            className='cursor-pointer'
            onClick={() => navigateToRestaurant(item)}
          >
            <CarouselItem
              image={item.images[0]}
              title={item.name}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MulitItemCarousel;
