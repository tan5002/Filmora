import React from 'react';
import MenuAdmin from './MenuAdmin';
import HeaderAdmin from './HeaderAdmin';
import AdminRouters from '../../../routes/adminrouters/AdminRouters';
function HomeAdmin() {
    return (
        <div className='md:flex'>
             <MenuAdmin />
           <div className="flex-1 bg-[#081028]">
             <HeaderAdmin/>
             <div className='lg:h-[calc(100vh-80px)] overflow-y-scroll scrollbar scrollbar-thumb-blue-500 scrollbar-track-gray-200'>
                <AdminRouters/>
             </div>
           </div>
        </div>
    );
}

export default HomeAdmin; 