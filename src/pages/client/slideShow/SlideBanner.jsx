

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    title: 'ĐÁU PHÁ THƯƠNG KHUNG',
    image: 'https://imgs.search.brave.com/ytT0filHUyZxyIJ0PrB6x0V2JcEazYN6Z0r_LZurlpw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bW9iaWxlY2l0eS52/bi9tb2JpbGVjaXR5/LXZuL2ltYWdlcy8y/MDIzLzA4L3BoaW0t/aG9hdC1oaW5oLTNk/LXRydW5nLXF1b2Mt/aGF5LW5oYXQtdG9w/LTEuanBnLndlYnA',
  },
  {
    title: 'TRU TIÊN KIẾM',
    image: 'https://imgs.search.brave.com/oq24cTDhGzC5-jtnFl60IPWDZVCx8EvyiUEvwV9kyeQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bW9iaWxlY2l0eS52/bi9tb2JpbGVjaXR5/LXZuL2ltYWdlcy8y/MDIzLzA4L3BoaW0t/aG9hdC1oaW5oLTNk/LXRydW5nLXF1b2Mt/aGF5LW5oYXQtdG9w/LTEyLmpwZy53ZWJw',
  },
  {
    title: 'ĐẤU LA ĐẠI LỤC',
    image: 'https://imgs.search.brave.com/ObCiaf-JlLeA2h7xIq5EVwOn-AFwaKMVGhZSRaRGclk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bW9iaWxlY2l0eS52/bi9tb2JpbGVjaXR5/LXZuL2ltYWdlcy8y/MDIzLzA4L3BoaW0t/aG9hdC1oaW5oLTNk/LXRydW5nLXF1b2Mt/aGF5LW5oYXQtdG9w/LTQuanBnLndlYnA',
  },
];

const SlideBanner = () => {
  return (
    <div className="w-full mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        effect="fade"
        className="overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[100vh]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-3xl md:text-5xl font-bold text-center px-4 drop-shadow-xl">
                  {slide.title}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideBanner;
