import { CircularProgress } from '@mui/material';
import React, { PropsWithChildren, useState } from 'react';
import { LoaderContext } from '../contexts/LoaderContext';

const LoaderProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const value = {loading, setLoading};
    return (
        <LoaderContext.Provider value={value}>
            {loading ? <CircularProgress/> : children}
        </LoaderContext.Provider>
    );
};

export default LoaderProvider;
