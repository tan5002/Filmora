import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DetailPage from '../../pages/client/detail/DetailPage';
import Main from '../../pages/client/homeClient/Main';
import Login from '../../pages/client/login/Login';
import WatchPage from '../../pages/client/detail/WatchPage'
import PlansPage from '../../pages/client/plans/PlansPage';
import DetailPlan from '../../pages/client/plans/PaymentPage';
import PaymentPage from '../../pages/client/plans/PaymentPage';
import RentPage from '../../pages/client/rent/RentPage';
import RentPayment from '../../pages/client/rent/RentMovie';
import RentMonth from '../../pages/client/rent/RentMonth';
import MovieCard from '../../pages/client/phimbo/MovieCard';
import AccountSetting from '../../pages/client/account/AccountSetting';
import HomeAccount from '../../pages/client/account/HomeAccount';
import AccountRouter from './AccountRouters';
import FavoriteMovie from '../../pages/client/favorite/FavoriteMovie';

function ClientRouters() {
    const routes = [
        {
            path:"/",
            component: <Main/>
        }
        ,{
            path:"/detail/:id/:idSeason",
            component: <DetailPage/>
        },
        {
            path: "/watchpage/:id/:idSeason",
            component: <WatchPage/>
        },
        {
            path: "/plans",
            component: <PlansPage/>
        },
        {
            path: "/plans/payment/:id",
            component: <PaymentPage/>
        },
        {
            path: "/rent/:id",
            component: <RentPage/>
        },
        {
            path: "/rent/payment/:id",
            component: <RentPayment/>
        },
        {
            path: "/rent/month/:id",
            component: <RentMonth/>
        },
        {
            path : "/phimbo",
            component: <MovieCard/>
        },
        {
            path: "/favorite",
            component: <FavoriteMovie/>
        }
    ]
    return (
        <div>
            <Routes>
                {
                    routes.map((route) => (
                        <Route path={route.path} element={route.component} />
                    ))
                }
            </Routes>
        </div>
    );
}

export default ClientRouters;