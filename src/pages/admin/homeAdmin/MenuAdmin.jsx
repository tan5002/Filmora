import React, { useState } from "react";
import { BiSolidRightDownArrowCircle } from "react-icons/bi";
import { IoDocument } from "react-icons/io5";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleRight,
  FaBars,
  FaDropbox,
  FaUserAlt,
} from "react-icons/fa";
import { RiHome2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { LISTMENU } from "../../../utils/contants";
function MenuAdmin() {
  const [subOpen, setSubOpen] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const [openMobile, setOpenMobile] = useState(true)
  const [color, setColor] = useState(false);
  const clickToggle = () => {
    setColor(!color);
  };
  const handleToggleSidebar = (id) => {
    if (subOpen == id) {
      setSubOpen(null);
    } else {
      setSubOpen(id);
    }
  };
  return (
    <div className="p-4 bg-[#1C1D27] md:overflow-y-auto md:h-[100vh] border-r-1 border-r-[#87888c] ">
      <h1 className="flex items-center gap-4 ">
        <FaBars
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="cursor-pointer text-white"
        />
        <span className="text-2xl font-bold text-white">FilMora</span>
      </h1>
      <div className={isSidebarOpen ? "" : "max-md:hidden"}>
        <h1 className="flex items-center gap-5 px-6 py-2 bg-[#73CABE]  rounded-md mt-2 ">
          <RiHome2Fill />
          {isSidebarOpen && (
            <span className="text-black font-bold">Dashboard</span>
          )}
        </h1>
        {isSidebarOpen && <span className="text-[#87888c]">UI ELEMENTS </span>}

        <div>
          <Link to="admin/categories">
            <h1
              onClick={clickToggle}
              className={`flex items-center gap-5 px-6 py-2 text-[#87888c]  rounded-md mt-2  cursor-pointer shadow-sm  transition  ${
                color ? "" : "bg-[#73CABE] text-black"
              } `}
            >
              <FaDropbox />
              {isSidebarOpen && <p> Categories</p>}
            </h1>
          </Link>
        </div>
        {isSidebarOpen && <span className="text-[#87888c]">FORMS AND DATA </span>}
        <div>
          {LISTMENU.map((item) => (
            <>
              <div
                className={`flex items-center gap-5 px-6 py-2 rounded-md mt-2 text-[#87888c] ${
                  subOpen === item.id ? "bg-[#73CABE] text-black" : ""
                }`}
                onClick={() => handleToggleSidebar(item.id)}
              >
                {item.icon}
                {isSidebarOpen && (
                  <>
                    <span className="whitespace-nowrap">{item.name}</span>
                  </>
                )}
                {subOpen === item.id ? (
                  <FaArrowAltCircleDown className="ml-auto" />
                ) : (
                  <FaArrowAltCircleRight className="ml-auto" />
                )}
              </div>
              {subOpen === item.id && (
                <ul className="ml-4 mt-2 text-[#87888c] rounded-md shadow-lg p-2 space-y-1">
                  {item.subMenu.map((subItem) => (
                    <li>
                      <Link to={subItem.path}>
                        <span className="block px-3 py-2 rounded hover:bg-green-100 hover:text-black hover:font-bold text-gray-700 cursor-pointer transition">
                          {subItem.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </div>
        {isSidebarOpen && <span className="text-[#87888c]">PAGES </span>}

        <div>
          <h1
            className="flex items-center gap-5 px-6 py-2 text-[#87888c] rounded-md mt-2 "
          >
            <FaUserAlt />
            {isSidebarOpen && <Link to="admin/user"> User</Link>}
          </h1>
        </div>
        {isSidebarOpen && <span className="text-[#87888c]">USER MANAGEMENT </span>}
        <div>
          <h1
            className="flex items-center gap-5 px-6 py-2 text-[#87888c] rounded-md mt-2 "
          >
            <FaUserAlt />
            {isSidebarOpen && (
              <Link to="admin/usermanagement"> User Management</Link>
            )}
          </h1>
        </div>
        {isSidebarOpen && <span className="text-[#87888c]">HELP</span>}
        <div>
          <h1
            className="flex items-center gap-5 px-6 py-2 text-[#87888c] rounded-md mt-2 "
          >
            <IoDocument />
            {isSidebarOpen && <Link to="admin/profile"> Profile</Link>}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default MenuAdmin;
