import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../config/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { IGroceryItem, INewGroceryItem } from '../models/grocery-item';

export const createGrocery = (item: INewGroceryItem): Promise<IGroceryItem> => {
    return httpClient.post(`groceries`, { json: item }).json();
};

export const useCreateGrocery = () => {

    return useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.grocery]);
        },
        onError: () => {
            // TODO: Handle error
        },
        mutationFn: createGrocery,
    });
};
