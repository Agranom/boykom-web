import { UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { useHttpClient } from '../services/http-client';
import { useAlert } from './use-alert';
import { HTTPError } from 'ky';

type ApiOptions<TData> = {
    url: string;
    method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
    body?: unknown;
    params?: Record<string, string | number | boolean>;
    headers?: Record<string, string>;
    onSuccess?: (data: TData) => void;
    onError?: (error: unknown) => void;
};

type QueryOptions<TData> = Omit<UseQueryOptions<TData, unknown, TData, string[]>, 'queryKey' | 'queryFn'>;
type MutationOptions<TData, TVariables> = Omit<UseMutationOptions<TData, unknown, TVariables>, 'mutationFn'>;

// export function useApiQuery<TData = unknown>(
//     queryKey: string | string[], 
//     options: ApiOptions<TData> & QueryOptions<TData>
// ): UseQueryResult<TData> {
//     const httpClient = useHttpClient();
//     const { showError } = useAlert();
    
//     const queryKeyArray = Array.isArray(queryKey) ? queryKey : [queryKey];
    
//     return useQuery<TData>({
//         queryKey: queryKeyArray,
//         queryFn: async () => {
//             try {
//                 const { url, params, headers } = options;
//                 const response = await httpClient.get(url, {
//                     searchParams: params,
//                     headers
//                 }).json();
//                 return response as TData;
//             } catch (error) {
//                 // Error will be handled by the global error handler via the httpClient
//                 // but we can add additional handling here if needed
//                 throw error;
//             }
//         },
//         ...options,
//     });
// }

// export function useApiMutation<TData = unknown, TVariables = unknown>(
//     options: ApiOptions<TData> & MutationOptions<TData, TVariables>
// ): UseMutationResult<TData, unknown, TVariables> {
//     const httpClient = useHttpClient();
//     const { showError } = useAlert();
    
//     return useMutation<TData, unknown, TVariables>({
//         mutationFn: async (variables) => {
//             try {
//                 const { url, method = 'post', headers } = options;
//                 const body = options.body ?? variables;
                
//                 const response = await httpClient[method](url, {
//                     json: body,
//                     headers
//                 }).json();
                
//                 return response as TData;
//             } catch (error) {
//                 // Error will be handled by the global error handler via the httpClient
//                 // but we can add additional handling here if needed
//                 throw error;
//             }
//         },
//         ...options,
//     });
// } 