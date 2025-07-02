import React from 'react';
import Categories from '../../pages/admin/categories/Categories';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../pages/admin/dashboard/Dashboard';
import Movie from '../../pages/admin/media_Management/Movies/Movie';
import Episodes from '../../pages/admin/media_Management/Episodes/Episodes';
import Trailer from '../../pages/admin/media_Management/Trailer/Trailer';
import Feature from '../../pages/admin/vip/Feature/Feature';
import Package from '../../pages/admin/vip/Package/Package';
import Plans from '../../pages/admin/vip/Plans/Plans';
import Comment from '../../pages/admin/engagement_pages/Comment/Comment';
import Like from '../../pages/admin/engagement_pages/Like/Like';
import Watchlist from '../../pages/admin/engagement_pages/Watchlist/Watchlist';
import Actor from '../../pages/admin/cast&crew/Actor/Actor'
import Author from '../../pages/admin/cast&crew/Author/Author'
import Character from '../../pages/admin/cast&crew/Character/Character'


function AdminRouters() {
    const routes = [
        {
            path: '/',
            component: <Dashboard/>
        },
        {
            path: '/admin/categories',
            component: <Categories/>
        },
        // Media Management
        {
            path: '/admin/movie',
            component: <Movie/>
        },
        {
            path: '/admin/episodes',
            component: <Episodes/>
        },
        {
            path: '/admin/trailer',
            component: <Trailer/>
        },
        // Vip
        {
            path: '/admin/vip/feature',
            component: <Feature/>
        },
        {
            path: '/admin/vip/package',
            component: <Package/>
        },
        {
            path: '/admin/vip/plans',
            component: <Plans/>
        },
        // engagement Pages
        {
            path: '/admin/comment',
            component: <Comment/>
        },
        {
            path: '/admin/like',
            component: <Like/>
        },
        {
            path: '/admin/watchlist',
            component: <Watchlist/>
        },
        // Cast && Crew
        {
            path: '/admin/actor',
            component: <Actor/>
        },
        {
            path: '/admin/author',
            component: <Author/>
        },
        {
            path: '/admin/character',
            component: <Character/>
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

export default AdminRouters;