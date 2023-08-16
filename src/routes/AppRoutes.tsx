import { LinearProgress } from '@mui/material';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './index';

const AppRoutes = () => {

    const element = useRoutes(routes);

    return <Suspense fallback={<LinearProgress color={'primary'}/>}>{element}</Suspense>;
};

export default AppRoutes;
