import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { FaHeart, FaClock, FaCrown } from 'react-icons/fa';
import { getOjectById } from '../../../services/convertFunction';
import { Link } from 'react-router-dom';

const SlideCard = ({ sliderItems, authors, plans }) => {
  
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-6">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {sliderItems.map((movie, index) => (
          <SwiperSlide key={index}>
            <Link to={`/detail/${movie.idMovie}/${movie.id}`}>
              <div className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all">
                <img
                  src={movie.imgUrl }
                  alt={movie.title}
                  className="w-full h-[300px] object-cover "
                />
                <div className="p-3 bg-black bg-opacity-70 text-white text-sm font-semibold flex-0">
                  {movie.title}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-80 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end gap-2">
                  <div className="text-lg font-bold">{movie.name}</div>
                  <div className="text-lg font-bold text-red-500">
                    {getOjectById(authors, movie.author)?.name}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FaClock className="text-yellow-400" />
                    <span>{movie.duration} phút</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-yellow-400">
                    <FaCrown />
                    <span>{getOjectById(plans, movie.plan)?.title}</span>
                  </div>
                  <div className="flex gap-3 mt-3">
                    <FaHeart className="text-red-500 hover:scale-110 transition-transform cursor-pointer" />
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideCard;
