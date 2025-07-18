import { useRef, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { ContextMovie } from "../../../context/MovieProvider";
import { FaCirclePlay } from "react-icons/fa6";
import { FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { TiInfoLargeOutline } from "react-icons/ti";

export default function Slider() {
  const swiperRef = useRef(null);
  const movies = useContext(ContextMovie);

  return (
    <div className="relative">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.5}
        spaceBetween={40}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: true,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
        className="h-[100vh]"
      >
        {movies.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="w-[280px] h-full rounded-2xl overflow-hidden relative shadow-xl transition-transform duration-500"
          >
            <div
              className="relative w-full h-full group overflow-hidden rounded-2xl"
              onMouseEnter={() => swiperRef.current?.autoplay.stop()}
              onMouseLeave={() => swiperRef.current?.autoplay.start()}
            >
              {/* Ảnh */}
              <img
                src={slide.imgUrl}
                alt={slide.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div
                className="absolute bottom-0 w-full text-center bg-black/50 text-white text-2xl font-bold 
                opacity-0 translate-y-20 group-hover:opacity-100 group-hover:-translate-y-7
                transition-all duration-500 ease-in-out pointer-events-none"
              >
                <div className="w-[40%] mx-auto flex items-center justify-between gap-4 py-4">
                  {[FaCirclePlay, FaRegBookmark, FaRegHeart, TiInfoLargeOutline].map((Icon, idx) => (
                    <div
                      key={idx}
                      className="w-10 h-10 flex items-center hover:scale-150 justify-center rounded-full border-2 border-white hover:bg-black transition-all duration-300"
                    >
                      <Icon size={20} />
                    </div>
                  ))}
                </div>
                {slide.name}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
