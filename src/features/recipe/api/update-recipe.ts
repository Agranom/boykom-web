import { IRecipe, IUpsertRecipe } from '../models/recipe';
import httpClient from '../../../services/http-client';
import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import { queryClient } from '../../../config/react-query';

export const updateRecipe = ({ id, ...data }: IUpsertRecipe): Promise<IRecipe> => {
  return httpClient.put(`recipes/${id}`, { json: data }).json();
};

export const useUpdateRecipe = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    onSuccess: ({ id }: IRecipe) => {
      onSuccess();
      queryClient.invalidateQueries([queryKeys.recipes, id]);
    },
    onError: () => {
      // TODO: Handle error
    },
    mutationFn: updateRecipe,
  });
};
