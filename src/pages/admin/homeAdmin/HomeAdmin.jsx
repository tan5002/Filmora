import React from 'react';
import MenuAdmin from './MenuAdmin';
import HeaderAdmin from './HeaderAdmin';
import AdminRouters from '../../../routes/adminrouters/AdminRouters';
function HomeAdmin() {
    return (
        <div className='md:flex  '>
             <MenuAdmin />
           <div className="flex-1 bg-[#171821]">
             <HeaderAdmin/>
             <div className='mt-2  '>
                <AdminRouters/>
             </div>
           </div>
        </div>
    );
}

export default HomeAdmin; 