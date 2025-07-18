import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseResponse";

export const ContextMovie = createContext();

export const MovieProvider = ({ children }) => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Movies", (movieList) => {
      setMovie(movieList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);
  console.log(movie);
  
  return (
    <ContextMovie.Provider value={movie}>
      {children}
    </ContextMovie.Provider>
  );
};