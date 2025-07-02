import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseResponse";

export const ContextPlans= createContext();

export const PlanProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Plans", (plansList) => {
        setPlan(plansList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextPlans.Provider value={plan}>
      {children}
    </ContextPlans.Provider>
  );
};