import React, { useContext , useEffect, useState} from "react";
import { FaCrown, FaEye } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOjectById } from "../../../services/convertFunction";
import { ContextMovie } from "../../../context/MovieProvider";
import { ContextCategories } from "../../../context/CategoryProvider";
import { ContextAuthor } from "../../../context/AuthorProvider";
import { ContextCharacter } from "../../../context/CharacterProvider";
import { ContextPlans } from "../../../context/PlanProvider";
import { ContextEpisodes } from "../../../context/EpisodesProvider";
import { ContextSubscription } from "../../../context/SubscriptionProvider";

import { PiFilmReel } from "react-icons/pi";
import CaoCap from "../../../assets/caocap1-removebg-preview.png";
import Filmora from "../../../assets/filmore-removebg.png";
import Sieuviet from "../../../assets/sieuviet-removebg.png";
import { handleClickMovie } from "../../../services/movieResponsive";
import { useAuth } from "../../../context/AuthsProvider";
import { ContextRentMovie } from "../../../context/RentMovieProvider";
import { ContextSeason } from "../../../context/SeasonProvider";
function DetailPage() {
  const { isLogin } = useAuth();
  const movies = useContext(ContextMovie);
  const categories = useContext(ContextCategories);
  const characters = useContext(ContextCharacter);
  const author = useContext(ContextAuthor);
  const plans = useContext(ContextPlans);
  const { id } = useParams();
  const movie = getOjectById(movies, id) || {};
  const episodes = useContext(ContextEpisodes);
  const subscription = useContext(ContextSubscription);
  const rentMovie = useContext(ContextRentMovie);
  const seasons = useContext(ContextSeason);
  const season = seasons.find((s) => s.idMovie === id);
  const seasonNumber = season?.id || "";
  console.log(seasons);
  
  const navigate = useNavigate();
  const [title,setTitle] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
     const newTitle =  handleClickMovie(isLogin, navigate, movie,subscription, plans, rentMovie, seasonNumber);
     setTitle(newTitle);
  },[isLogin,movie,subscription,plans,rentMovie,seasonNumber]);
  return (
    <div className="bg-gradient-to-b from-[#1f1f1f] to-[#111] text-white p-6 ">
      <div className="mx-auto grid grid-cols-1  lg:grid-cols-2 mt-[100px] gap-5 ">
        {/* image */}
        <div>
          <img
            src={movie?.imgUrl}
            alt="Solo Leveling"
            className={`w-[400px] rounded-2xl shadow-lg h-[520px] object-cover m-auto ${
              episodes.filter((e) => e.idMovie === movie.id).length > 1
                ? "many"
                : "one"
            } `}
          />
        </div>
        <div>
          <h1 className="text-6xl font-bold ">{season.title}</h1>
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
              <span className="font-semibold text-white">Characters : </span>
              <div className="flex gap-2">
                {movie.listChar?.map((item) => (
                  <img
                    key={item}
                    src={getOjectById(characters, item)?.imgUrl}
                    alt=""
                    className="w-10 h-10 rounded-full m-auto object-cover"
                  />
                ))}
              </div>
            </div>
            <p>
              <span className="font-semibold text-white">Duration:</span>{" "}
              {movie.duration} phút
            </p>
            <p className="flex gap-2">
              <FaCrown />
              <span className="font-semibold text-white">Plan:</span>{" "}
              {getOjectById(plans, movie.plan)?.title}
            </p>
            <p className="flex items-center gap-2 mt-2">
              <FaEye className="text-gray-400" /> 6078 Views
            </p>
          </div>
          <div className="flex gap-4">
            <div onClick={() => handleClickMovie(isLogin, navigate, movie,subscription, plans, rentMovie,seasonNumber)}
              className="mt-6 flex items-center w-fit gap-2 px-5 py-2 bg-white text-black font-semibold rounded-lg shadow hover:text-white hover:bg-black transition"
            >
              <FaRegCirclePlay />
               {title}
            </div>     
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-5 mt-5 ">
        <img src={CaoCap} alt="Cao Cấp" className="w-[70%] m-auto" />
        <img src={Sieuviet} alt="Siêu Việt" className="w-[70%] m-auto" />
        <img src={Filmora} alt="Filmora" className="m-auto" />
      </div>
    
    </div>
  );
}

export default DetailPage;
