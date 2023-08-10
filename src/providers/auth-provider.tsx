import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eAppRoutes } from '../const/app-routes.enum';
import { eAuthRoutes } from '../features/auth/routes/AuthRoutes';
import tokenStorage from '../utils/token-storage';

const AuthProvider: React.FC<PropsWithChildren> = (props) => {
    const navigate = useNavigate();
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const verifyUserToken = useCallback(() =>  {
        const token = tokenStorage.getToken();
        if (!token) {
            setIsSignedIn(false);
            return navigate(`/${eAppRoutes.Auth}/${eAuthRoutes.SignIn}`);
        }
        setIsSignedIn(true);
        return navigate(eAppRoutes.Home);
    }, [navigate]);
    useEffect(() => {
        verifyUserToken();
    }, [isSignedIn, verifyUserToken]);

    return (
        <>{props.children}</>
    );
};

export default AuthProvider;
