import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { FoodNutrient } from '../models/food-nutrient.interface';

/**
 * Requests calculated nutrients for a food product and portion size
 */
export const getFoodProductNutrients = async (productKey: string, portionSizeG: number): Promise<FoodNutrient[]> => {
  return httpClient
    .get(`food-products/${productKey}/nutrients?grams=${portionSizeG}`)
    .json();
};

/**
 * React Query hook to recalculate food product nutrients when product or portion changes
 */
export const useGetFoodProductNutrients = (
  productKey?: string,
  portionSizeG?: number,
): UseQueryResult<FoodNutrient[], unknown> => {
  return useQuery({
    queryKey: [queryKeys.foodProductNutrients, productKey, portionSizeG],
    queryFn: () => getFoodProductNutrients(productKey as string, portionSizeG as number),
    enabled: !!(productKey && portionSizeG),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });
};