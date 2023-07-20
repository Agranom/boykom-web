import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../config/reqct-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { IGroceryItem } from '../models/grocery-item';

export const changeGroceryStatus = ({ id, status }: Partial<IGroceryItem>): Promise<Partial<IGroceryItem>> => {
    return httpClient.patch(`groceries/${id}.json`, { json: { status } }).json();
};

export const useChangeGroceryStatus = () => {
    return useMutation({

        onMutate: async (newItem: Partial<IGroceryItem>) => {
            await queryClient.cancelQueries([queryKeys.grocery]);

            const previousGroceries = queryClient.getQueryData<IGroceryItem[]>([queryKeys.grocery]);

            const updatedGroceries = (previousGroceries || [])
                .map(item => item.id === newItem.id ? { ...item, status: newItem.status } as IGroceryItem : item);

            queryClient.setQueriesData([queryKeys.grocery], updatedGroceries);

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
        mutationFn: changeGroceryStatus,
    });
};
