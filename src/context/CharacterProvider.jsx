import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseResponse";

export const ContextCharacter = createContext();

export const CharacterProvider = ({ children }) => {
  const [character, setCharacter] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Characters", (characterList) => {
      setCharacter(characterList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextCharacter.Provider value={character}>
      {children}
    </ContextCharacter.Provider>
  );
};