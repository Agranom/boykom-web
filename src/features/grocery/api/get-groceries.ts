import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { IGroceryItem } from '../models/grocery-item';

export const getGroceries = async (inFridge: boolean): Promise<IGroceryItem[]> => {
    return await httpClient.get(`groceries?inFridge=${inFridge}`).json();
};

export const useGroceries = (inFridge: boolean) => {
    return useQuery({ 
        queryKey: [queryKeys.grocery], 
        queryFn: () => getGroceries(inFridge) 
    });
};
