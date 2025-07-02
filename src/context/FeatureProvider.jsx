import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseResponse";

export const ContextFeature = createContext();

export const FeatureProvider = ({ children }) => {
  const [feature, setFeature] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Features", (featureList) => {
        setFeature(featureList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextFeature.Provider value={feature}>
      {children}
    </ContextFeature.Provider>
  );
};