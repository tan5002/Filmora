import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { FaHeart, FaClock, FaCrown } from 'react-icons/fa';
import { getOjectById } from '../../../services/convertFunction';
import { Link } from 'react-router-dom';

const SlideMovies = ({movies, authors, plans}) => {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-6">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <Link to={`/detail/${movie.id}`}>
              <div className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all">
                <img
                  src={movie.imgUrl}
                  alt={movie.name}
                  className="w-full h-[300px] object-cover "
                />
                <div className="p-3 bg-black bg-opacity-70 text-white text-sm font-semibold">
                  {movie.name}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-80 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end gap-2">
                  <div className="text-lg font-bold">{movie.name}</div>
                  <div className="text-lg font-bold text-red-500">{getOjectById(authors, movie.author)?.name}</div>
                  <div className="flex items-center gap-2 text-sm">
                    <FaClock className="text-yellow-400" />
                    <span>{movie.duration} phút </span>
                  </div>     
                    <div className="flex items-center gap-2 text-sm text-yellow-400">
                      <FaCrown />
                      <span>{getOjectById(plans, movie.plan)?.title}</span>
                    </div>
                  <div className="flex gap-3 mt-3">
                    <FaHeart className="text-red-500 hover:scale-110 transition-transform cursor-pointer" />
                    <svg
                      className="w-5 h-5 text-white hover:text-yellow-400 cursor-pointer"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 20h14v-2H5v2zm7-18L5.33 9h13.34L12 2z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-white hover:text-blue-400 cursor-pointer"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14l4-4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                    </svg>
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

export default SlideMovies;
