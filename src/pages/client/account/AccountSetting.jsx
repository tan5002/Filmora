import React from "react";
import { useAuth } from "../../../context/AuthsProvider";
import SideAccount from "./SideAccount";
import { FcGoogle } from "react-icons/fc";

export default function AccountSetting() {
  const { isLogin } = useAuth();
  return (
    <div className="flex-1 ml-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Account Information
      </h2>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              value={isLogin?.userName}
              readOnly
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={isLogin?.email}
              readOnly
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 text-gray-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Gender</label>
          <div className="mt-1 flex space-x-4">
            <label className="flex items-center space-x-2">
              <input type="radio" name="gender" className="form-radio" />
              <span>Male</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="gender" className="form-radio" />
              <span>Female</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="gender" className="form-radio" />
              <span>Other</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          {!isLogin?.password ? (
            <>
              <label className="flex text-sm font-medium">
                <FcGoogle className=" text-xl transform transition duration-300 hover:scale-200 hover:brightness-200" />
                * Login by Google 
              </label>
            </>
          ) : (
            <>
              <label className=" block text-sm font-medium text-red-600 ">
                * Password
              </label>
              <input
                type="password"
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                value={isLogin.password}
              />
            </>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
