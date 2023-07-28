import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../config/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { IGroceryItem } from '../models/grocery-item';

export const createGrocery = (item: IGroceryItem): Promise<Partial<IGroceryItem>> => {
    return httpClient.post(`groceries`, { json: item }).json();
};

export const useCreateGrocery = () => {
    return useMutation({
        onMutate: async (newItem: IGroceryItem) => {
            await queryClient.cancelQueries([queryKeys.grocery]);

            const previousGroceries = queryClient.getQueryData<IGroceryItem[]>([queryKeys.grocery]);

            queryClient.setQueryData([queryKeys.grocery], [...(previousGroceries || []), newItem]);

            return { previousGroceries };
        },
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.grocery]);
        },
        onError: (error, _, context: any) => {
            if (context?.previousGroceries) {
                queryClient.setQueryData([queryKeys.grocery], context.previousGroceries);
            }
        },
        mutationFn: createGrocery,
    });
};
