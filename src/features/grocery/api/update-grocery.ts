import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../config/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { IGroceryItem } from '../models/grocery-item';

export const updateGrocery = ({ id, ...rest }: Partial<IGroceryItem>): Promise<IGroceryItem> => {
  return httpClient.patch(`groceries/${id}`, { json: rest }).json();
};

export const useUpdateGrocery = () => {
  return useMutation({
    onMutate: async (newItem: Partial<IGroceryItem>) => {
      await queryClient.cancelQueries([queryKeys.grocery]);

      const previousGroceries = queryClient.getQueryData<IGroceryItem[]>([queryKeys.grocery]);

      const previousItem = previousGroceries?.find(i => i.id === newItem.id);
      const isMoved = previousItem && previousItem.inFridge !== newItem.inFridge;

      let updatedGroceries = [];

      if (isMoved) {
        updatedGroceries = (previousGroceries || []).filter(i => i.id !== newItem.id);
      } else {
        updatedGroceries = (previousGroceries || []).map(i => (newItem.id === i.id) ? { ...i, ...newItem } : i);
      }

      queryClient.setQueryData([queryKeys.grocery], updatedGroceries);

      return { previousGroceries };
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.grocery]);
    },
    onError: () => {
      queryClient.invalidateQueries([queryKeys.grocery]);
    },
    mutationFn: updateGrocery,
  });
};
