import { Button } from "@mui/material";
import React from "react";
import { CiSearch } from "react-icons/ci";

function AdminHeader({ handleOpen, title, name, handleSearch }) {
  return ( 
    <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between p-3 gap-4">
  {/* Title */}
  <div className="p-2 color-title rounded-[5px] text-white w-full sm:w-auto ">
    {title}
  </div>

  {/* Search */}
  <div className="flex items-center border border-white p-2 text-white w-full sm:w-auto">
    <CiSearch />
    <input
      type="text"
      onChange={handleSearch}
      placeholder="Enter keyword"
      className="outline-none ml-2 text-white placeholder-white w-full bg-transparent"
    />
  </div>

  {/* Button */}
  <button
    className="py-2 px-3 color-title text-white rounded-[3px]  "
    onClick={handleOpen}
  >
    {name}
  </button>
</div>

  );
}

export default AdminHeader;
