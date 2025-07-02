import { Button } from '@mui/material';
import React from 'react';
import { CiSearch } from 'react-icons/ci';


function AdminHeader({handleOpen, title, name, handleSearch}) {   

    return (
        <div className='flex items-center justify-between p-3'>
            <div className='p-2 bg-[#73CABE] rounded-[5px] ' >
                {title}
            </div>
            <div className='flex items-center justify-between border-1 p-2 text-white'>
                <CiSearch/>
                <input type="text" onChange={handleSearch}  placeholder='Enter keyword' className="outline-none ml-2 text-white placeholder-white" />
            </div>
            <Button variant="contained" onClick={handleOpen}>{name}</Button>
            
        </div>
    );
}

export default AdminHeader;