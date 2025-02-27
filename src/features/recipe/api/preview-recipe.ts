import httpClient from '../../../services/http-client';
import { useMutation } from '@tanstack/react-query';
import { IRecipeMetadata } from '../models/recipe-metadata';

export const previewRecipe = (postUrl: string): Promise<void> => {
  return httpClient.post('recipes/from-social/preview', { json: { postUrl } }).json();
};

export const usePreviewRecipe = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    onSuccess: () => {
      onSuccess();
    },
    onError: () => {
      // TODO: Handle error
    },
    mutationFn: previewRecipe,
  });
};
