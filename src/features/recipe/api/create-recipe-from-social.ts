import httpClient from '../../../services/http-client';
import { useMutation } from '@tanstack/react-query';
import { IRecipeMetadata } from '../models/recipe-metadata';

export const createRecipeFromSocial = (metadata: IRecipeMetadata): Promise<unknown> => {
  return httpClient.post('recipes/from-social', { json: metadata }).json();
};

export const useCreateRecipeFromSocial = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    onSuccess: () => {
      onSuccess();
    },
    mutationFn: createRecipeFromSocial,
  });
};

