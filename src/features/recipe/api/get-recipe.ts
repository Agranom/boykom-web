import { IRecipe } from '../models/recipe';
import httpClient from '../../../services/http-client';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';

export const getRecipeById = (id: string): Promise<IRecipe> => {
  return httpClient.get(`recipes/${id}`).json();
}

export const useRecipeById = (id: string) => {
  return useQuery({ queryKey: [queryKeys.recipes, id], queryFn: () => getRecipeById(id), enabled: !!id });
};
