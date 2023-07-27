import React, { PropsWithChildren } from 'react';

type AuthLayoutProps = PropsWithChildren & {
    title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
    return (
        <>
            <h2>{title}</h2>
            {children}
        </>
    );
};

export default AuthLayout;
