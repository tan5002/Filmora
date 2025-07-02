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
import RentPayment from '../../pages/client/rent/RentPayment';

function ClientRouters() {
    const routes = [
        {
            path:"/",
            component: <Main/>
        }
        ,{
            path:"/detail/:id",
            component: <DetailPage/>
        },
        {
            path: "/watchpage/:id",
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