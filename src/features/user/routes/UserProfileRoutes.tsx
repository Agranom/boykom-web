import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const PersonalInfo = React.lazy(() => import('../components/PersonalInfo'));

export enum eUserRoutes {
    PersonalInfo = 'personal-info',
    Groups = 'groups',
}


const UserProfileRoutes = () => {
    return (
        <Routes>
            <Route path={eUserRoutes.PersonalInfo} element={<PersonalInfo/>}/>
            <Route path="*" element={<Navigate to={eUserRoutes.PersonalInfo} replace/>}/>
        </Routes>
    );
};

export default UserProfileRoutes;
