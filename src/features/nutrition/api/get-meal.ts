import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { Meal } from '../models/meal.interface';

export const getMealById = async (id: string): Promise<Meal> => {
  return httpClient.get(`meals/${id}`).json<Meal>();
};

export const useGetMealById = (id?: string): UseQueryResult<Meal, unknown> => {
  return useQuery({
    queryKey: [queryKeys.mealDetails, id],
    queryFn: () => getMealById(id!),
    enabled: !!id,
  });
};

