import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseResponse";

export const ContextActor = createContext();

export const ActorProvider = ({ children }) => {
  const [actor, setActor] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Actors", (actorList) => {
      setActor(actorList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextActor.Provider value={actor}>
      {children}
    </ContextActor.Provider>
  );
};