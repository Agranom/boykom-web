import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eAppRoutes } from '../const/app-routes.enum';
import { eAuthRoutes } from '../features/auth/routes/AuthRoutes';
import tokenStorage from '../utils/token-storage';
import { AuthContext } from '../contexts/AuthContext';

const AuthProvider: React.FC<PropsWithChildren> = (props) => {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>();
  const verifyUserToken = useCallback(() => {
    const token = tokenStorage.getToken();
    if (!token) {
      setIsSignedIn(false);
      setAccessToken(undefined);
      return navigate(`/${eAppRoutes.Auth}/${eAuthRoutes.SignIn}`);
    }
    setIsSignedIn(true);
    setAccessToken(token);
  }, [navigate]);

  useEffect(() => {
    verifyUserToken();
  }, [isSignedIn, verifyUserToken]);

  return (
    <AuthContext.Provider value={{ isSignedIn, accessToken }}>
      {isSignedIn ? props.children : null}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
