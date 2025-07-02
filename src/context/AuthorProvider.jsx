import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseResponse";

export const ContextAuthor = createContext();

export const AuthorProvider = ({ children }) => {
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Author", (authorList) => {
      setAuthor(authorList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextAuthor.Provider value={author}>
      {children}
    </ContextAuthor.Provider>
  );
};