import { IRecipe } from '../models/recipe';
import httpClient from '../../../services/http-client';
import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import { queryClient } from '../../../config/react-query';

export const createRecipe = (newRecipe: Omit<IRecipe, 'id'>): Promise<unknown> => {
  return httpClient.post('recipes', { json: newRecipe }).json();
};

export const useCreateRecipe = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries([queryKeys.userRecipe]);
    },
    onError: () => {
      // TODO: Handle error
    },
    mutationFn: createRecipe,
  });
};
