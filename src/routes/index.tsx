import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { subscribeToNotifications } from '../config/push-notifications';
import { eAppRoutes } from '../const/app-routes.enum';
import AuthRoutes from '../features/auth/routes/AuthRoutes';
import { getUser } from '../features/auth/store/auth-slice';
import { AppDispatch } from '../store/store';

const Grocery = React.lazy(() => import('../features/grocery/Grocery'));
const FamilyGroup = React.lazy(() => import('../features/family-group/components/FamilyGroup'));

const MainContent = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getUser());
        subscribeToNotifications();
    }, [dispatch]);

    return (
        <Outlet/>
    );
};

export const routes = [
    {
        path: eAppRoutes.Home,
        element: <MainContent/>,
        children: [
            { path: `/`, element: <Grocery/> },
            { path: `/${eAppRoutes.Groceries}`, element: <Grocery/> },
            { path: `/${eAppRoutes.Groups}`, element: <FamilyGroup/> },
            // Will be developed in the future
            // { path: `/${eAppRoutes.Profile}/*`, element: <UserProfileRoutes/> },
        ],
    },
    {
        path: `/${eAppRoutes.Auth}/*`,
        element: <AuthRoutes/>,
    },
];
