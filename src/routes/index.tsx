import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { eAppRoutes } from '../const/app-routes.enum';
import AuthRoutes from '../features/auth/routes/AuthRoutes';
import { getUser } from '../features/auth/store/auth-slice';
import AuthProvider from '../providers/auth-provider';
import { AppDispatch } from '../store/store';

const Grocery = React.lazy(() => import('../features/grocery/Grocery'));

const MainContent = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <AuthProvider>
            <Outlet/>
        </AuthProvider>
    );
};

export const routes = [
    {
        path: eAppRoutes.Home,
        element: <MainContent/>,
        children: [
            { path: `/`, element: <Grocery/> },
            { path: `/${eAppRoutes.Groceries}`, element: <Grocery/> },
            // Will be developed in the future
            // { path: `/${eAppRoutes.Profile}/*`, element: <UserProfileRoutes/> },
        ],
    },
    {
        path: `/${eAppRoutes.Auth}/*`,
        element: <AuthRoutes/>,
    },
];
