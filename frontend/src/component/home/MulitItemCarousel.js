import React, { useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import CarouselItem from './CarouselItem';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMenuItems } from '../state/menu/Action.js';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Box } from "@mui/material";

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

  const jwt = localStorage.getItem('jwt') || '';
  const dispatch = useDispatch();
  const { menu } = useSelector(store => store);
  console.log("menu loading ", menu.loading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllMenuItems(jwt));
  }, [dispatch, jwt]);

  const navigateToRestaurant = (item) => {
    console.log("navigating to restaurant");
    navigate(`/restaurant/${item.restaurantCity}/${item.restaurantName}/${item.restaurantId}`);
  };

  return (
    <div>
      {menu.loading ? (
        <Box className="flex justify-center items-center w-full h-40">
          <CircularProgress size={50} />
        </Box>
      ) : (
        <div className="overflow-hidden">
          <Slider {...settings}>
            {[...menu.menuItems].reverse().map((item, index) => (
              <div
                key={index}
                className='cursor-pointer'
                onClick={() => navigateToRestaurant(item)}
              >
                <CarouselItem
                  image={item?.images?.[0]?.imageUrl}
                  title={item.name}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default MulitItemCarousel;
