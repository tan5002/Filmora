import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseResponse";

export const ContextRentMovie= createContext();

export const RentMovieProvider = ({ children }) => {
  const [rentMovie, setRentMovie] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("RentMovies", (rentMovieList) => {
        setRentMovie(rentMovieList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextRentMovie.Provider value={rentMovie}>
      {children}
    </ContextRentMovie.Provider>
  );
};