import { Route, Routes } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';

export enum eAuthRoutes {
    SignIn = 'sign-in',
    SignUp = 'sign-up',
}

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="sign-in" element={<SignIn/>}/>
            <Route path="sign-up" element={<SignUp/>}/>
            <Route index element={<SignIn/>}/>
        </Routes>
    );
};

export default AuthRoutes;
