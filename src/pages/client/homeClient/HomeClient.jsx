import React, { useState } from 'react';
import Header from '../../../components/client/Header';
import Footer from '../../../components/client/Footer';
import ClientRouters from '../../../routes/clientrouters/ClientRouters';
import SlideBanner from '../slideShow/SlideBanner';
import Login from '../login/Login';

function HomeClient({handleSearch, wrapperRef, search}) {
     const [open,setOpen] = useState(false);
    const openLogin = () => {
        setOpen(true);
    }
const onClose = () => {
     setOpen(false);
}

    return (
        <div className='body'>
            <Header openLogin={openLogin} handleSearch={handleSearch} wrapperRef={wrapperRef} search={search}/>
                <ClientRouters/>
            <Footer/>
            <Login open={open} onClose={onClose}  />
        </div>
    );
}

export default HomeClient;