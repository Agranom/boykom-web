import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../config/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { IGroceryItem } from '../models/grocery-item';

export const deleteGrocery = (id: string): Promise<string> => {
    return httpClient.delete(`groceries/${id}`).json();
};

export const useDeleteGrocery = () => {
    return useMutation({
        onMutate: async (itemId: string) => {
            await queryClient.cancelQueries([queryKeys.grocery]);

            const previousGroceries = queryClient.getQueryData<IGroceryItem[]>([queryKeys.grocery]);

            const updatedGroceries = previousGroceries?.filter(g => g.id !== itemId);

            queryClient.setQueryData([queryKeys.grocery], updatedGroceries);

            return { previousGroceries };
        },
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.grocery], { refetchType: 'none' });
        },
        onError: (error, _, context: any) => {
            if (context?.previousGroceries) {
                queryClient.setQueryData([queryKeys.grocery], context.previousGroceries);
            }
        },
        mutationFn: deleteGrocery,
    });
};
