import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { Meal } from '../models/nutrition.interface';

interface GetMealsParams {
  from?: Date;
  to?: Date;
}

/**
 * Fetches meals from the API
 */
export const getMeals = async (params?: GetMealsParams): Promise<Meal[]> => {
  const searchParams = new URLSearchParams();
  if (params?.from) {
    searchParams.append('from', params.from.toISOString());
  }
  if (params?.to) {
    searchParams.append('to', params.to.toISOString());
  }
  const queryString = searchParams.toString();
  const url = queryString ? `meals?${queryString}` : 'meals';
  return httpClient.get(url).json();
};

/**
 * React Query hook to fetch meals
 */
export const useGetMeals = (params?: GetMealsParams): UseQueryResult<Meal[], unknown> => {
  return useQuery({
    queryKey: [queryKeys.meals, params?.from, params?.to],
    queryFn: () => getMeals(params),
    staleTime: 30 * 1000,
  });
};

