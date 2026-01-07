import { DefaultOptions, QueryClient, Query, QueryCache, MutationCache } from '@tanstack/react-query';
import { getAlertUtils } from '../utils/alert-utils';
import { HTTPError } from 'ky';

const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    return 'An unexpected error occurred';
};

const queryConfig: DefaultOptions = {
    queries: {
        useErrorBoundary: false,
        refetchOnWindowFocus: false,
        retry: (failureCount: number, error: unknown) => {
            return failureCount < 3 && error instanceof HTTPError && error.response.status >= 500;
        },
        networkMode: 'offlineFirst',
    },
    mutations: {
        useErrorBoundary: false, 
        retry: (failureCount: number, error: unknown) => {
            return failureCount < 2 && error instanceof HTTPError && error.response.status !== 400 && error.response.status !== 401;
        },
    },
};

// Create a query cache with error handling
const queryCache = new QueryCache({
    onError: (error: unknown) => {
        const message = getErrorMessage(error);
        console.error('Query Error:', message);
        getAlertUtils().showError('Что-то пошло не так. Пожалуйста, попробуйте еще раз.');
    },
});

// Create a mutation cache with error handling
const mutationCache = new MutationCache({
    onError: (error: unknown) => {
        const message = getErrorMessage(error);
        console.error('Mutation Error:', message);
        getAlertUtils().showError('Что-то пошло не так. Пожалуйста, попробуйте еще раз.');
    },
});

export const queryClient = new QueryClient({ 
    defaultOptions: queryConfig,
    queryCache,
    mutationCache,
});
