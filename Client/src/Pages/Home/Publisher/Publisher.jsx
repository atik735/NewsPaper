import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './slider.css';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';

const Publisher = () => {
  return (
    <div className="my-10">
      <h1 className="text-2xl font-bold mb-5 text-center">Publisher</h1>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        freeMode={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper"
      >
        {[...Array(9)].map((_, i) => (
          <SwiperSlide key={i} className="">
            <div className="card shadow-sm">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title justify-center">The Daily Buletin</h2>
  </div>
</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Publisher;
