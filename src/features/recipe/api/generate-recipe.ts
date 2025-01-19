import httpClient from '../../../services/http-client';
import { useMutation } from '@tanstack/react-query';
import { IRecipe } from '../models/recipe';

export const generateRecipeFromInstagram = (postUrl: string): Promise<IRecipe> => {
  return httpClient.post('recipes/generate/instagram', { json: { postUrl } }).json();
};

export const useGenerateRecipeFromInstagram = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    onSuccess: () => {
      onSuccess();
    },
    onError: () => {
      // TODO: Handle error
    },
    mutationFn: generateRecipeFromInstagram,
  });
};

