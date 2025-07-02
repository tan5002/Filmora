import React, { useContext } from 'react';
import SlideBanner from '../slideShow/SlideBanner';
import SlideMovies from '../slideShow/SlideMovies';
import { ContextMovie } from '../../../context/MovieProvider';
import { ContextAuthor } from '../../../context/AuthorProvider';
import { ContextPlans } from '../../../context/PlanProvider';

function Main() {
    const movies = useContext(ContextMovie)
    const authors = useContext(ContextAuthor)
    const plans = useContext(ContextPlans)
    return (
        <div>
            <SlideBanner />
            <SlideMovies movies={movies} authors={authors} plans={plans}/>
            <SlideMovies movies={movies} authors={authors} plans={plans}/>
            <SlideMovies movies={movies} authors={authors} plans={plans}/>
            <SlideMovies movies={movies} authors={authors} plans={plans}/>
        </div>
    );
}

export default Main;