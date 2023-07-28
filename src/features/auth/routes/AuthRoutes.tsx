import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';

export enum eAuthRoutes {
    SignIn = 'sign-in',
    SignUp = 'sign-up',
}

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path={eAuthRoutes.SignIn} element={<SignIn/>}/>
            <Route path={eAuthRoutes.SignUp} element={<SignUp/>}/>
            <Route path="*" element={<Navigate to={eAuthRoutes.SignIn} replace/>}/>
        </Routes>
    );
};

export default AuthRoutes;
