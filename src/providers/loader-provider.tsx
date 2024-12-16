import React, { PropsWithChildren, useState } from 'react';
import { LoaderContext } from '../contexts/LoaderContext';
import LoaderPrimary from '../shared/LoaderPrimary';

const LoaderProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const value = {loading, setLoading};
    return (
        <LoaderContext.Provider value={value}>
            {loading && <LoaderPrimary />}
            {children}
        </LoaderContext.Provider>
    );
};

export default LoaderProvider;
