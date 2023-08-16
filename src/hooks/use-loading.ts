import { useContext } from 'react';
import { LoaderContext, LoaderContextValues } from '../contexts/LoaderContext';

export const useLoading = () => {
    const context = useContext<LoaderContextValues>(LoaderContext);
    if (!context) {
        throw new Error('useLoading must be used within LoadingProvider');
    }
    return context;
}
