import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { MealTemplate } from '../models/meal.interface';

export const getMealTemplates = async (): Promise<MealTemplate[]> => {
  return httpClient.get('meals/templates').json<MealTemplate[]>();
};

export const useGetMealTemplates = (): UseQueryResult<MealTemplate[], unknown> => {
  return useQuery({
    queryKey: [queryKeys.mealTemplates],
    queryFn: () => getMealTemplates(),
  });
};

