import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { subscribeToNotifications } from '../config/push-notifications';
import { eAppRoutes } from '../const/app-routes.enum';
import AuthRoutes from '../features/auth/routes/AuthRoutes';
import { getUser } from '../features/auth/store/auth-slice';
import AuthProvider from '../providers/auth-provider';
import LoaderProvider from '../providers/loader-provider';
import { AppDispatch } from '../store/store';
import SocketProvider from '../providers/socket-provider';
import RecipeDetails from '../features/recipe/RecipeDetails';

const GroceryManager = React.lazy(() => import('../features/grocery/GroceryManager'));
const FamilyGroup = React.lazy(() => import('../features/family-group/components/FamilyGroup'));
const Recipe = React.lazy(() => import('../features/recipe/Recipe'));
const Nutrition = React.lazy(() => import('../features/nutrition/Nutrition'));

const MainContent = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUser());
    subscribeToNotifications();
  }, [dispatch]);

  return (
    <AuthProvider>
      <LoaderProvider>
        <SocketProvider>
          <Outlet/>
        </SocketProvider>
      </LoaderProvider>
    </AuthProvider>
  );
};

export const routes = [
  {
    path: eAppRoutes.Home,
    element: <MainContent/>,
    children: [
      { path: `/`, element: <GroceryManager/> },
      { path: `/${eAppRoutes.Groceries}`, element: <GroceryManager/> },
      { path: `/${eAppRoutes.Groups}`, element: <FamilyGroup/> },
      { path: `/${eAppRoutes.Recipes}`, element: <Recipe/> },
      { path: `/${eAppRoutes.Recipes}/:id`, element: <RecipeDetails/> },
      { path: `/${eAppRoutes.Nutrition}`, element: <Nutrition/> },
      // Will be developed in the future
      // { path: `/${eAppRoutes.Profile}/*`, element: <UserProfileRoutes/> },
    ],
  },
  {
    path: `/${eAppRoutes.Auth}/*`,
    element: <AuthRoutes/>,
  },
];
