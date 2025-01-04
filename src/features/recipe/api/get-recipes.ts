import { IUserRecipe } from '../models/recipe';
import httpClient from '../../../services/http-client';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';

export const getUserRecipes = (): Promise<IUserRecipe[]> => {
  return httpClient.get('recipes/my').json();
}

export const useUserRecipes = () => {
  return useQuery({ queryKey: [queryKeys.userRecipe], queryFn: getUserRecipes });
};
