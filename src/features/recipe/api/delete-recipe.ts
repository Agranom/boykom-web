import httpClient from '../../../services/http-client';
import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import { queryClient } from '../../../config/react-query';

export const deleteRecipe = (id: string): Promise<unknown> => {
  return httpClient.delete(`recipes/${id}`).json();
};

export const useDeleteRecipe = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries([queryKeys.userRecipe]);
    },
    onError: () => {
      // TODO: Handle error
    },
    mutationFn: deleteRecipe,
  });
};
