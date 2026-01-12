import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { FoodNutrients } from '../models/nutrition.interface';
/**
 * Requests calculated nutrients for a product and portion size
 */
export const getNutrients = async (productKey: string, portionSizeG: number): Promise<FoodNutrients> => {
  return httpClient
    .get(`food-nutrients/${productKey}?grams=${portionSizeG}`)
    .json();
};

/**
 * React Query hook to recalculate nutrients when product or portion changes
 */
export const useGetNutrients = (
  productKey?: string,
  portionSizeG?: number,
): UseQueryResult<FoodNutrients, unknown> => {
  return useQuery({
    queryKey: [queryKeys.foodNutrients, productKey, portionSizeG],
    queryFn: () => getNutrients(productKey as string, portionSizeG as number),
    enabled: !!(productKey && portionSizeG),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });
};

