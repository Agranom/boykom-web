import { createContext } from 'react';

export type LoaderContextValues = {
    loading: boolean;
    setLoading: (value: boolean) => void;
}

export const LoaderContext = createContext<LoaderContextValues>({
    loading: false,
    setLoading: () => {
    },
});
