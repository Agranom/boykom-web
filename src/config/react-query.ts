import { DefaultOptions, QueryClient } from '@tanstack/react-query';

const queryConfig: DefaultOptions = {
    queries: {
        useErrorBoundary: true,
        refetchOnWindowFocus: false,
        retry: false,
        networkMode: 'offlineFirst',
    },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
