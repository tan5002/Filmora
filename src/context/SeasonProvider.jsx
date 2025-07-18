import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseResponse";

export const ContextSeason = createContext();

export const SeasonProvider = ({ children }) => {
  const [season, setSeason] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Seasons", (seasonList) => {
        setSeason(seasonList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);
  console.log(season);
  
  return (
    <ContextSeason.Provider value={season}>
      {children}
    </ContextSeason.Provider>
  );
};