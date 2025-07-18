import React from 'react';
import { FaRegUser, FaUserCircle } from 'react-icons/fa';
import { IoGiftOutline } from 'react-icons/io5';
import { LiaThListSolid } from "react-icons/lia";
import Logout from "@mui/icons-material/Logout";
import { FaRectangleList } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
function SideAccount({isLogin}) {
    return (
        <div>
             <div className="flex flex-col items-center">
          {
            isLogin ? 
            <img src={isLogin?.imgUrl} alt={isLogin?.useName} className='w-24 h-24 rounded-full object-cover' />:
            <FaUserCircle className='text-3xl' />
          }
          <p className="text-sm font-semibold text-gray-800 mb-2">{isLogin?.email}</p>
        </div>
        <nav className="mt-6 space-y-3">
          <Link to={"/setting/account"} className="w-full  flex gap-3 items-center font-medium hover:text-blue-600 hover:underline"><FaRegUser />  Account</Link>
          <Link to={"/setting/rentedMovie"} className="w-full  flex gap-3 items-center hover:text-blue-600 hover:underline"> <FaRectangleList />Movie Library Management</Link>
          <Link to={"/setting/managePlans"} className="w-full  flex gap-3 items-center hover:text-blue-600 hover:underline whitespace-nowrap"> <LiaThListSolid />Subscription Plan Management</Link>
          <div className="w-full  flex gap-3 items-center hover:text-blue-600 hover:underline"> <IoGiftOutline /> Your Offers</div>
          <div className="w-full  flex gap-3 items-center hover:underline hover:text-blue-600" > <Logout /> Logout</div>
        </nav>
        </div>
    );
}

export default SideAccount;