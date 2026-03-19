import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { FoodNutrient } from '../models/food-nutrient.interface';

/**
 * Requests calculated nutrients for a user dish and portion size
 */
export const getDishNutrients = async (dishId: string, portionSizeG: number): Promise<FoodNutrient[]> => {
  return httpClient
    .get(`user-dishes/${dishId}/nutrients?grams=${portionSizeG}`)
    .json();
};

/**
 * React Query hook to recalculate dish nutrients when dish or portion changes
 */
export const useGetDishNutrients = (
  dishId?: string,
  portionSizeG?: number,
): UseQueryResult<FoodNutrient[], unknown> => {
  return useQuery({
    queryKey: [queryKeys.dishNutrients, dishId, portionSizeG],
    queryFn: () => getDishNutrients(dishId as string, portionSizeG as number),
    enabled: !!(dishId && portionSizeG),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });
};