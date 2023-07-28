import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../config/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { IGroceryItem } from '../models/grocery-item';

export const updateGrocery = ({ id, ...rest }: IGroceryItem): Promise<IGroceryItem> => {
    return httpClient.put(`groceries/${id}`, { json: rest }).json();
};

export const useUpdateGrocery = () => {
    return useMutation({
        onMutate: async (newItem: IGroceryItem) => {
            await queryClient.cancelQueries([queryKeys.grocery]);

            const previousGroceries = queryClient.getQueryData<IGroceryItem[]>([queryKeys.grocery]);

            const updatedGroceries = (previousGroceries || [])
                .map(i => (newItem.id === i.id) ? newItem : i);

            queryClient.setQueryData([queryKeys.grocery], updatedGroceries);

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
        mutationFn: updateGrocery,
    });
};
