import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useParams } from "react-router-dom";
import { FaCrown, FaPlayCircle } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineLike } from "react-icons/ai";

import { ContextMovie } from "../../../context/MovieProvider";
import { ContextCategories } from "../../../context/CategoryProvider";
import { ContextActor } from "../../../context/ActorProvider";
import { ContextAuthor } from "../../../context/AuthorProvider";
import { ContextPlans } from "../../../context/PlanProvider";
import { ContextEpisodes } from "../../../context/EpisodesProvider";
import { ContextComment } from "../../../context/CommentProvider";
import { ContextSeason } from "../../../context/SeasonProvider";
import { useAuth } from "../../../context/AuthsProvider";
import { getOjectById } from "../../../services/convertFunction";
import { addDocument } from "../../../services/firebaseResponse";

function WatchPage() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { id, idSeason } = useParams();

  const { isLogin } = useAuth();
  const movies = useContext(ContextMovie);
  const categories = useContext(ContextCategories);
  const actor = useContext(ContextActor);
  const author = useContext(ContextAuthor);
  const plans = useContext(ContextPlans);
  const episodes = useContext(ContextEpisodes);
  const comments = useContext(ContextComment);
  const seasons = useContext(ContextSeason);

  const movie = getOjectById(movies, id) || {};
  const currentSeason = seasons.find(
    (s) => s.idMovie === id && String(s.seasonNumber) === String(idSeason)
  );

  const filteredEpisodes = episodes
    .filter((ep) => ep.seasonId === currentSeason?.id)
    .sort((a, b) => a.episodeNumber - b.episodeNumber);

  const [current, setCurrent] = useState(filteredEpisodes[0] || null);
  const [inputValue, setInputValue] = useState("");
  const defaultCount = 5;
  const [visibleCount, setVisibleCount] = useState(defaultCount);

  useEffect(() => {
    setCurrent(filteredEpisodes[0]);
    window.scrollTo(0, 0);
  }, [idSeason, episodes]);

  const filterComment = comments
    .filter((e) => e.idMovie === movie.id)
    .sort((a, b) => b.createdAt - a.createdAt);

  const handleCancel = () => setInputValue("");
  const handleSend = async () => {
    const dataSent = {
      isLogin: isLogin.id,
      idMovie: id,
      content: inputValue,
      createdAt: new Date(),
    };
    await addDocument("Comments", dataSent);
    setInputValue("");
  };

  const currentIndex = filteredEpisodes.findIndex(
    (ep) => ep.id === current?.id
  );

  return (
    <>
      {/* Video player */}
      <div className="w-full h-[100vh] m-auto">
        <iframe
          src={current?.episodeUrl}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      {/* Tập trước - kế */}
      <div className="flex justify-between w-[80%] mx-auto mt-4 text-white">
        <Button
          disabled={currentIndex <= 0}
          onClick={() => setCurrent(filteredEpisodes[currentIndex - 1])}
        >
          Tập trước
        </Button>
        <Button
          disabled={currentIndex >= filteredEpisodes.length - 1}
          onClick={() => setCurrent(filteredEpisodes[currentIndex + 1])}
        >
          Tập kế
        </Button>
      </div>

      {/* Info section */}
      <div className="w-[80%] mx-auto bg-[#121212] text-white p-6 grid grid-cols-12 gap-2 text-2xl">
        <div className="col-span-12 lg:col-span-8">
          <h2 className="font-bold">{movie.name}</h2>
          <div className="text-sm mt-2 text-gray-400">
            <span>2022</span> · <span>16+</span> · <span>{movie.duration}</span>
          </div>
          <p className="text-sm text-gray-300 mt-4 leading-relaxed">
            {movie.description}
          </p>
          <div className="flex items-center gap-3 mt-4 text-xl">
            <FaCrown /> Gói phim: {getOjectById(plans, movie.plan)?.title}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 text-sm text-gray-300 mt-10 lg:mt-0">
          <table className="w-full">
            <tbody className="flex flex-col gap-3">
              <tr>
                <td className="font-semibold text-white">Diễn viên:</td>
                <td className="flex gap-2 flex-wrap">
                  {movie.listActor?.map((id) => {
                    const a = getOjectById(actor, id);
                    return (
                      a && (
                        <img
                          key={id}
                          src={a.imgUrl}
                          alt={a.name}
                          className="w-10 h-10 rounded-full"
                        />
                      )
                    );
                  })}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-white">Đạo diễn:</td>
                <td>{getOjectById(author, movie.author)?.name}</td>
              </tr>
              <tr>
                <td className="font-semibold text-white">Thể loại:</td>
                <td>
                  {movie.listCate
                    ?.map((id) => getOjectById(categories, id)?.name)
                    .join(", ")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Episode list */}
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
          {filteredEpisodes.map((item) => (
            <SwiperSlide key={item.id}>
              <Box
                onClick={() => setCurrent(item)}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                className={`relative transition border-2 ${
                  current?.id === item.id
                    ? "border-red-500 opacity-100"
                    : "border-transparent opacity-60"
                }`}
              >
                <img
                  className="rounded-md w-full h-[200px] object-cover"
                  src={movie.imgUrl}
                  alt={`Tập ${item.episodeNumber}`}
                />
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    current?.id === item.id ? "text-red-500" : "text-white"
                  }`}
                >
                  <FaPlayCircle className="text-3xl" />
                </div>
                <div
                  className={`absolute bottom-1 right-2 text-sm font-semibold ${
                    current?.id === item.id ? "text-red-500" : "text-white"
                  }`}
                >
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

      {/* Comment input */}
      <div className="flex items-start gap-3 py-3 w-[80%] m-auto mt-10">
        {isLogin?.imgUrl ? (
          <img
            className="w-10 h-10 rounded-full object-cover"
            alt="Avatar"
            src={isLogin.imgUrl}
          />
        ) : (
          <RxAvatar className="text-4xl text-white hover:text-blue-500" />
        )}
        <div className="w-full">
          <TextareaAutosize
            placeholder="Viết bình luận"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            minRows={3}
            style={{
              width: "100%",
              color: "white",
              backgroundColor: "transparent",
              border: "1px solid gray",
              padding: "8px",
              resize: "none",
            }}
          />
          {inputValue && (
            <div className="flex gap-2 mt-2">
              <Button variant="contained" size="small" onClick={handleSend}>
                Gửi
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={handleCancel}
                sx={{ color: "white", borderColor: "gray" }}
              >
                Hủy
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Comment list */}
      {filterComment.slice(0, visibleCount).map((e) => (
        <div
          key={e.id}
          className="flex gap-3 px-2 py-3 w-[80%] m-auto border border-white/30 mt-2"
        >
          <img
            src={isLogin.imgUrl}
            alt={isLogin.userName}
            className="w-15 h-15 object-cover"
          />
          <div>
            <div className="text-sm text-white">
              <span className="font-semibold text-blue-500 hover:underline">
                {isLogin.userName}
              </span>
              <span className="ml-2 text-gray-400 text-xs">
                {e.createdAt.toDate().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="text-sm text-white mt-0.5">{e.content}</div>
            <div className="flex gap-2 text-blue-700 items-center">
              <AiOutlineLike className="hover:scale-200" />
              <div className="hover:underline">Phản hồi</div>
            </div>
          </div>
        </div>
      ))}
      {filterComment.length > defaultCount && (
        <div className="text-center mt-4">
          {visibleCount < filterComment.length ? (
            <button
              onClick={() =>
                setVisibleCount((prev) =>
                  Math.min(prev + 5, filterComment.length)
                )
              }
              className="text-blue-500 hover:underline text-sm"
            >
              Xem thêm bình luận
            </button>
          ) : (
            <button
              onClick={() => setVisibleCount(defaultCount)}
              className="text-blue-500 hover:underline text-sm"
            >
              Ẩn bớt bình luận
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default WatchPage;
