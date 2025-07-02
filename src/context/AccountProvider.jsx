import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseResponse";

export const ContextAccount = createContext();

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Accounts", (accountList) => {
        setAccount(accountList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextAccount.Provider value={account}>
      {children}
    </ContextAccount.Provider>
  );
};