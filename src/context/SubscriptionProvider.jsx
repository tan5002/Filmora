import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseResponse";

export const ContextSubscription = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [subscription, setSubscription] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Subscriptions", (subscriptionList) => {
        setSubscription(subscriptionList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextSubscription.Provider value={subscription}>
      {children}
    </ContextSubscription.Provider>
  );
};