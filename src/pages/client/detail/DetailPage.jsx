import React, { useContext } from "react";
import { FaCrown, FaEye } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { getOjectById } from "../../../services/convertFunction";
import { ContextMovie } from "../../../context/MovieProvider";
import { ContextCategories } from "../../../context/CategoryProvider";
import { ContextAuthor } from "../../../context/AuthorProvider";
import { ContextActor } from "../../../context/ActorProvider";
import { ContextPlans } from "../../../context/PlanProvider";
import { ContextEpisodes } from "../../../context/EpisodesProvider";
import { PiFilmReel } from "react-icons/pi";
import CaoCap from "../../../assets/caocap1-removebg-preview.png";
import Filmora from "../../../assets/filmore-removebg.png";
import Sieuviet from "../../../assets/sieuviet-removebg.png";

function DetailPage() {
  const movies = useContext(ContextMovie);
  const categories = useContext(ContextCategories);
  const actor = useContext(ContextActor);
  const author = useContext(ContextAuthor);
  const plan = useContext(ContextPlans);
  const { id } = useParams();
  const movie = getOjectById(movies, id) || {};
  const episodes = useContext(ContextEpisodes);

  return (
    <div className="bg-gradient-to-b from-[#1f1f1f] to-[#111] text-white p-6 ">
      <div className="mx-auto grid grid-cols-1  lg:grid-cols-2 mt-[100px] gap-5 ">
        {/* image */}
        <div>
          <img
            src={movie?.imgUrl}
            alt="Solo Leveling"
            className={`w-[400px] rounded-2xl shadow-lg h-[520px] object-cover m-auto ${episodes.filter((e) => e.idMovie === movie.id).length > 1 ?"many" : "one"} `}
          />
        </div>
        <div>
          <h1 className="text-6xl font-bold ">{movie.name}</h1>
          <div className="text-sm text-gray-300 space-y-2 mt-5">
            <p className="flex items-center gap-2">
              <PiFilmReel />
              <span className="font-semibold text-white"> Author: </span>
              <span className="text-green-400">
                {" " + getOjectById(author, movie.author)?.name}
              </span>
            </p>
            <p>
              <span className="font-semibold text-white">Type:</span>
              <span className="text-green-400"> Movie</span>
            </p>
            <p>
              <span className="font-semibold text-white">Genre: </span>
                {movie.listCate?.map(
                  (item) => getOjectById(categories, item)?.name + " "
                )}
            </p>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-white">Actor : </span>
              <div>
                <img
                  src={movie.listActor?.map(
                    (item) => getOjectById(actor, item)?.imgUrl
                  )}
                  alt=""
                  className="w-10 h-10 rounded-full m-auto"
                />
              </div>
            </div>
            <p>
              <span className="font-semibold text-white">Duration:</span>{" "}
              {movie.duration} phút
            </p>
            <p className="flex gap-2">
              <FaCrown />
              <span className="font-semibold text-white">Plan:</span>{" "}
              {getOjectById(plan, movie.plan)?.title}
            </p>
            <p className="flex items-center gap-2 mt-2">
              <FaEye className="text-gray-400" /> 6078 Views
            </p>
          </div>
          <div className="flex gap-4">

          <Link to={`/watchpage/${movie.id}`} className="mt-6 flex items-center w-fit gap-2 px-5 py-2 bg-white text-black font-semibold rounded-lg shadow hover:text-white hover:bg-black transition">
            <FaRegCirclePlay />
            Watch Now
          </Link>
          <Link to={`/rent/${movie.id}`} className="mt-6 flex items-center w-fit gap-2 px-5 py-2 bg-white/30 text-black font-semibold rounded-lg shadow hover:text-white hover:bg-black transition">
            <FaRegCirclePlay  />
            Thue Phim 
          </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-5 mt-5 ">
        <img src={CaoCap} alt="Cao Cấp" className="w-[70%] m-auto" />
        <img src={Sieuviet} alt="Siêu Việt" className="w-[70%] m-auto" />
        <img src={Filmora} alt="Filmora" className="m-auto" />
      </div>
      {/* Manga Releases */}
      <div className="max-w-4xl mx-auto mt-16">
        {episodes.idMovie === movie.id && episodes.episodeNumber > 1 ? (
          <h2 className="text-2xl font-bold mb-6">Chapters</h2>
        ) : null}
        <div className="space-y-4 text-white">
          {episodes
            .filter(
              (item) => item.idMovie === movie.id && item.episodeNumber > 1
            )
            .sort((a, b) => a.episodeNumber - b.episodeNumber)
            .map((item) => (
              <div
                key={item.episodeNumber}
                className="flex justify-between border-b border-gray-600 pb-2"
              >
                <div className="flex gap-3 font-semibold">
                  Chapter {item.episodeNumber}
                  {item.isNew && (
                    <span className="text-green-400 text-sm font-medium">
                      New
                    </span>
                  )}
                </div>
                <span className="text-gray-300 text-sm">{item.date}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
