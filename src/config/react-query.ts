import { DefaultOptions, QueryClient, Query, QueryCache } from '@tanstack/react-query';

const queryConfig: DefaultOptions = {
    queries: {
        useErrorBoundary: true,
        refetchOnWindowFocus: false,
        retry: false,
        networkMode: 'offlineFirst',
    },
    mutations: {
        useErrorBoundary: true, 
        retry: false,
    },
};

// Create a query cache with error handling
const queryCache = new QueryCache({
    onError: (error: unknown, query: Query) => {
        console.error('React Query Error:', error);
        
        // These errors should be caught either by the ErrorBoundary component 
        // or by your HTTP error handler in normal use cases
    },
});

export const queryClient = new QueryClient({ 
    defaultOptions: queryConfig,
    queryCache,
});
