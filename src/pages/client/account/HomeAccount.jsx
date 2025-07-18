import React from "react";
import { useAuth } from "../../../context/AuthsProvider";
import SideAccount from "./SideAccount";
import AccountRouter from "../../../routes/clientrouters/AccountRouters";
import { Outlet } from "react-router-dom";


export default function HomeAccount() {
  const { isLogin } = useAuth();
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex pt-[100px]">
      <div className="w-[30%] bg-white shadow rounded p-4">
        <SideAccount isLogin={isLogin} />
      </div>
      <div className="flex-1 ml-8 bg-white p-6 rounded shadow">
       {/* <AccountRouter/> */}
       <Outlet/>
      </div>
    </div>
  );
}
