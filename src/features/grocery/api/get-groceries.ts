import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { IGroceryItem } from '../models/grocery-item';

export const getGroceries = async (): Promise<IGroceryItem[]> => {
    return await httpClient.get(`groceries`).json();
};

const refetchInterval = process.env.REACT_APP_GROCERIES_REFETCH_TIME ?  +process.env.REACT_APP_GROCERIES_REFETCH_TIME : false;

export const useGroceries = () => {
    return useQuery({ queryKey: [queryKeys.grocery], queryFn: getGroceries, refetchInterval });
};
