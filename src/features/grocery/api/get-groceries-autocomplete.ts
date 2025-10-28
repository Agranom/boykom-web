import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';

export const getGroceriesAutocomplete = async (query: string): Promise<string[]> => {
    return await httpClient.get(`groceries/autocomplete?query=${query}`).json();
};

export const useGroceriesAutocomplete = (query: string) => {
    return useQuery({ 
        queryKey: [queryKeys.groceryAutocomplete, query], 
        queryFn: () => getGroceriesAutocomplete(query),
        enabled: query.length > 0
    });
};
