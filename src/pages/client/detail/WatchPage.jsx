import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Box, Typography, IconButton } from "@mui/material";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useParams } from "react-router-dom";
import { ContextMovie } from "../../../context/MovieProvider";
import { ContextCategories } from "../../../context/CategoryProvider";
import { ContextActor } from "../../../context/ActorProvider";
import { ContextAuthor } from "../../../context/AuthorProvider";
import { ContextPlans } from "../../../context/PlanProvider";
import { ContextEpisodes } from "../../../context/EpisodesProvider";
import { filterById, getOjectById } from "../../../services/convertFunction";
import { FaCrown } from "react-icons/fa";

function WatchPage() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { id } = useParams();
  const movies = useContext(ContextMovie);
  const categories = useContext(ContextCategories);
  const actor = useContext(ContextActor);
  const author = useContext(ContextAuthor);
  const plan = useContext(ContextPlans);
  const episodes = useContext(ContextEpisodes);
  const movie = getOjectById(movies, id) || {};
  const [listEpisodes, setListEpisodes] = useState([]);
  const [current, setCurrent] = useState({});

  const handleChangeEpisodes = (item) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrent(item);
  };
  useEffect(() => {
    const filterEpisodes = filterById(episodes, id, "idMovie");
    setListEpisodes(filterEpisodes);
    setCurrent(filterEpisodes[0]);
  }, [id, episodes]);
  return (
    <div>
      <div className="w-full h-[100vh] m-auto">
        <iframe
          src={current?.episodeUrl}
          className="w-full h-full"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      {/* Info section */}
      <div className="w-[80%] mx-auto bg-[#121212] text-white p-6 grid grid-cols-12 gap-2 text-2xl">
        <div className="col-span-12 lg:col-span-8">
          <h2 className="font-bold">{movie.name}</h2>

          <div className="flex items-center gap-2 mt-2">
            <div className="bg-orange-600 text-sm px-2 py-0.5 rounded flex items-center gap-1">
              <span>★</span>
              <span>4.8</span>
            </div>
            <span className="text-gray-500">(54)</span>
            <div className="flex gap-1 text-gray-600 text-sm">
              {[...Array(4)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2 text-xl">
            <FaCrown /> Gói phim: {getOjectById(plan, movie.plan)?.title}
          </div>

          <div className="text-sm mt-2">
            <span>2022</span> · <span>16+</span> · <span>13/13 tập</span> ·{" "}
            <span>{movie.duration}</span>
          </div>

          <div className="mt-2 text-sm text-gray-300">
            Bạo lực, khoả thân, kinh dị
          </div>

          <p className="text-sm text-gray-300 mt-4 leading-relaxed">
            {movie.description}
          </p>
        </div>

        <div className="col-span-12 lg:col-span-3 mt-10 lg:mt-0 text-sm text-gray-300">
          <div className="flex items-center gap-3">
            <span>🤍 Theo dõi</span>
            <span>↗ Chia sẻ</span>
          </div>

          <table className="w-full mt-3">
            <tbody className="flex flex-col gap-3">
              <tr>
                <td className="font-semibold text-white pr-2 align-top">
                  Diễn viên:
                </td>
                <td className="flex gap-2 flex-wrap">
                  {movie.listActor?.map((actorId) => {
                    const actorData = getOjectById(actor, actorId);
                    return actorData ? (
                      <img
                        key={actorId}
                        src={actorData.imgUrl}
                        alt={actorData.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : null;
                  })}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-white pr-2 align-top">
                  Đạo diễn:
                </td>
                <td>{getOjectById(author, movie.author)?.name}</td>
              </tr>
              <tr>
                <td className="font-semibold text-white pr-2 align-top">
                  Thể loại:
                </td>
                <td>
                  {movie.listCate
                    ?.map((cateId) => getOjectById(categories, cateId)?.name)
                    .join(", ")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Box
        sx={{
          backgroundColor: "#121212",
          color: "white",
          p: 2,
          position: "relative",
        }}
        className="w-[80%] mx-auto"
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Danh sách tập
        </Typography>

        <Swiper
          spaceBetween={12}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          modules={[Navigation]}
        >
          {listEpisodes
            .sort((a, b) => a.episodeNumber - b.episodeNumber)
            .map((item) => (
              <SwiperSlide key={item.id}>
                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    position: "relative",
                  }}
                  onClick={() => handleChangeEpisodes(item)}
                >
                {current.id === item.id && (
                  <div className="watching-icon absolute top-1 right-1 z-10">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                )}
                  <img
                    className={`rounded-md w-full h-[200px] object-cover relative cursor-pointer  ${current ? "bg-black/50" : "" }`}
                    src={movie.imgUrl}
                  />
                  <div className={`absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] ${current ? "text-red" : "" }`}>
                    Tập {item.episodeNumber}
                  </div>
                </Box>
              </SwiperSlide>
            ))}
        </Swiper>

        <IconButton
          ref={prevRef}
          sx={{
            position: "absolute",
            top: "45%",
            left: -12,
            zIndex: 10,
            backgroundColor: "#00000080",
            color: "white",
            "&:hover": { backgroundColor: "#ffffff20" },
          }}
        >
          <MdChevronLeft size={28} />
        </IconButton>

        <IconButton
          ref={nextRef}
          sx={{
            position: "absolute",
            top: "45%",
            right: -12,
            zIndex: 10,
            backgroundColor: "#00000080",
            color: "white",
            "&:hover": { backgroundColor: "#ffffff20" },
          }}
        >
          <MdChevronRight size={28} />
        </IconButton>
      </Box>
    </div>
  );
}

export default WatchPage;
