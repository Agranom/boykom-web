import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { eAppRoutes } from '../const/app-routes.enum';
import AuthRoutes from '../features/auth/routes/AuthRoutes';
import { getUser } from '../features/auth/store/auth-slice';
import Grocery from '../features/grocery/Grocery';
import AuthProvider from '../providers/auth-provider';
import { AppDispatch } from '../store/store';

const MainContent = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getUser())
    }, []);

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
            { path: `/${eAppRoutes.Groceries}`, element: <Grocery/> },
            { path: `/`, element: <Grocery/> },
        ],
    },
    {
        path: `/${eAppRoutes.Auth}/*`,
        element: <AuthRoutes/>,
    },
];
