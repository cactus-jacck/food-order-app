import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import CarouselItem from './CarouselItem';
import topMeals from "./TopMeals.js";

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

  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
        {topMeals.map((item, index) => (
          <CarouselItem
            key={index}
            image={item.image}
            title={item.title}
          />
        ))}
      </Slider>
    </div>
  );
};

export default MulitItemCarousel;
