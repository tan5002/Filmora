import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { FaHeart, FaClock, FaCrown } from 'react-icons/fa';
import { getOjectById } from '../../../services/convertFunction';
import { Link } from 'react-router-dom';

const SlideMovies = ({ movies, authors, plans, seasonId }) => {
  // Lấy danh sách ID movie
  const movieIds = movies.map(movie => movie.id);

  // Lọc các season có idMovie nằm trong movies
  const filterSeason = seasonId.filter(season => movieIds.includes(season.idMovie));

  console.log(filterSeason);
  
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
        {filterSeason.map((season, index) => {
          const movie = movies.find(m => m.id === season.idMovie);
          if (!movie) return null;

          return (
            <SwiperSlide key={index}>
              <Link to={`/detail/${season.idMovie}/${season.id}`}>
                <div className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all">
                  <img
                    src={season.imgUrl || movie.imgUrl}
                    alt={season.title || movie.title}
                    className="w-full h-[300px] object-cover "
                  />
                  <div className="p-3 bg-black bg-opacity-70 text-white text-sm font-semibold flex-0">
                     {season.seasonNumber === "0" ? " Tập Đặc biệt" : `Season ${season.seasonNumber}`} : 
                      {season.title }
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
          );
        })}
      </Swiper>
    </div>
  );
};

export default SlideMovies;
