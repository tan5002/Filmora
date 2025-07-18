import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseResponse";

export const ContextComment = createContext();

export const CommentProvider = ({ children }) => {
  const [comment, setCommet] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Comments", (commentList) => {
        setCommet(commentList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextComment.Provider value={comment}>
      {children}
    </ContextComment.Provider>
  );
};