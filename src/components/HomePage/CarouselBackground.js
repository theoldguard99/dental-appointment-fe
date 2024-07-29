import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import image1 from '../../assets/images/homepage-carousel-image1.jpg';
import image2 from '../../assets/images/hompage-carousel-image2.jpg';
import image3 from '../../assets/images/homepage-carousel-image3.jpg';
import image4 from '../../assets/images/homepage-carousel-image4.jpg';
import image5 from '../../assets/images/homepage-carousel-image5.jpg';
import image6 from '../../assets/images/homepage-carousel-image6.jpg';

const CarouselBackground = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false,
  };

  const images = [image1, image2, image3, image4, image5, image6];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <div
              className="w-full h-screen bg-cover bg-center"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.6,
              }}
            />
          </div>
        ))}
      </Slider>
      <div className="absolute inset-0 bg-black opacity-30" />
    </div>
  );
};

export default CarouselBackground;
