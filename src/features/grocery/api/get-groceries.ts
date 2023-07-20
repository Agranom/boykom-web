import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { IGroceryItem } from '../models/grocery-item';

export const getGroceries = async (): Promise<IGroceryItem[]> => {
    try {
        // Firebase returns response as Dictionary, so that we should transform it to Array
        const responseObj: { [key: string]: any } = await httpClient.get(`groceries.json`).json();
        return Object.entries(responseObj).map(([key, value]) => ({ id: key, ...value }));
    } catch (e) {
        return Promise.reject(e);
    }
};


export const useGroceries = () => {
    return useQuery({ queryKey: [queryKeys.grocery], queryFn: getGroceries });
};
