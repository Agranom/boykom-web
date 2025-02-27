import httpClient from '../../../services/http-client';
import { useMutation } from '@tanstack/react-query';
import { IRecipeMetadata, IRecipeVideoFile } from '../models/recipe-metadata';

export const abortGenerateRecipe = (data: Pick<IRecipeVideoFile, 'fileId' | 'fileName'>): Promise<IRecipeMetadata> => {
  return httpClient.post('recipes/from-social/abort', { json: data }).json();
};

export const useAbortRecipe = () => {
  return useMutation({
    mutationFn: abortGenerateRecipe,
  });
};
