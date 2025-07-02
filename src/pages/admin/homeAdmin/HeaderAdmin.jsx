import React, { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { FaBell } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthsProvider';
function HeaderAdmin() {
    const [isHover, setIsHover] = useState(false);
    const {logout} = useAuth()
    return (
        <div>
            <div className="flex items-center justify-between text-white rounded-md mt-2 px-2">
                <div>
                    <h1 className="text-4xl font-bold">Good Morning, Admin</h1>
                    <p className="text-gray-500">Welcome to the Admin Dashboard</p>
                </div>
                <div className="flex items-center gap-4 text-2xl">
                    <CiSearch />
                    <MdEmail/>
                    <FaBell />
                    <div className="w-10 h-10 rounded-full  border-2 border-blue-950 relative">
                        <img onClick={() => setIsHover(!isHover)} className='rounded-full cursor-pointer w-10 h-10' src="https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=1378&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="user"  />
                        <div className={isHover ? 'bg-gray-300 absolute right-6 top-[40px] rounded-xl z-10 ' : 'hidden'}>
                            <ul>
                                <li >
                                    <Link className='text-xl block px-[50px] py-3 rounded-xl hover:bg-blue-300 cursor-pointer transition'>Home</Link>
                                </li>
                                <li>
                                    <Link className= 'block px-[50px] py-3 rounded-xl hover:bg-blue-300 cursor-pointer transition text-xl'>Profile</Link>
                                </li>
                                <li onClick={logout}>
                                    <Link  className= 'block px-[50px] py-3 rounded-xl hover:bg-blue-300 cursor-pointer transition text-xl'>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default HeaderAdmin;