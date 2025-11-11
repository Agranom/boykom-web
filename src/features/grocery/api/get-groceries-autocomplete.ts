import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';

export const getGroceriesAutocomplete = async (): Promise<string[]> => {
    return await httpClient.get(`groceries/autocomplete`).json();
};

export const useGroceriesAutocomplete = () => {
    return useQuery({ 
        queryKey: [queryKeys.groceryAutocomplete], 
        queryFn: () => getGroceriesAutocomplete(),
    });
};
