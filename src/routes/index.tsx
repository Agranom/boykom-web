import { Outlet } from 'react-router-dom';
import { eAppRoutes } from '../const/app-routes.enum';
import AuthRoutes from '../features/auth/routes/AuthRoutes';
import Grocery from '../features/grocery/Grocery';
import AuthProvider from '../providers/auth-provider';

const MainContent = () => {
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
