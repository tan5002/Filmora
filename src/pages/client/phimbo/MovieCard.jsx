import React, { useContext } from "react";
import Slider3D from "./Slider3D";
import { ContextMovie } from "../../../context/MovieProvider";
import { ContextSeason } from "../../../context/SeasonProvider";
import SlideMovies from "../slideShow/SlideMovies";
import SlideCard from "./SliderCard";
import { ContextAuthor } from "../../../context/AuthorProvider";
import { ContextPlans } from "../../../context/PlanProvider";



const MovieCard = () => {
const movie = useContext(ContextMovie);
const plans = useContext(ContextPlans);
const sliderItems = movie.filter(e => e.isSeries.includes("Phim bộ"))
const authors = useContext(ContextAuthor)
console.log(sliderItems);

  return (
    <>
      <Slider3D/>
      <SlideCard sliderItems={sliderItems}  authors={authors} plans={plans}/>
    </>
  );
};

export default MovieCard;
