import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { FoodNutrient } from '../models/food-nutrient.interface';
/**
 * Requests all nutrients
 */
export const getNutrients = async (): Promise<FoodNutrient[]> => {
  return httpClient
    .get(`nutrients`)
    .json();
};

export const useGetNutrients = (
): UseQueryResult<FoodNutrient[], unknown> => {
  return useQuery({
    queryKey: [queryKeys.nutrients],
    queryFn: () => getNutrients(),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });
};

