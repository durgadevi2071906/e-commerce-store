import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

function Slider({images,image}) {

  return (
    <Swiper
    pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
     <SwiperSlide><div className="image"><img src={image} alt="" /></div></SwiperSlide>
      {
        images.map((img,i)=>(
        <SwiperSlide key={i}><div className="image"><img src={img} alt="" /></div></SwiperSlide>
        )
     )}  
    </Swiper>
  )
}

export default Slider
