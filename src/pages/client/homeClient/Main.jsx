import React, { useContext } from "react";
import SlideMovies from "../slideShow/SlideMovies";
import { ContextMovie } from "../../../context/MovieProvider";
import { ContextAuthor } from "../../../context/AuthorProvider";
import { ContextPlans } from "../../../context/PlanProvider";
import { ContextSeason } from "../../../context/SeasonProvider";

import SliderBanner from "../slideShow/SlideBanner";
function Main() {
  const movies = useContext(ContextMovie);
  const authors = useContext(ContextAuthor);
  const plans = useContext(ContextPlans);
  const seasonId = useContext(ContextSeason);

  return (
    <div>
      {/* <SlideBanner /> */}
      <div className="py-[70px]">
        <SliderBanner />
      </div>
        
          <SlideMovies
            movies={movies}
            authors={authors}
            plans={plans}
            seasonId={seasonId} 
          />
    </div>
  );
}

export default Main;
