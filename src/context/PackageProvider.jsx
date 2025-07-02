import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseResponse";

export const ContextPackage= createContext();

export const PackageProvider = ({ children }) => {
  const [isPackage, setIsPackage] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Packages", (packagesList) => {
        setIsPackage(packagesList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextPackage.Provider value={isPackage}>
      {children}
    </ContextPackage.Provider>
  );
};