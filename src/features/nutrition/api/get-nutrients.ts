import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { Nutrients } from '@agranom/boykom-common';
/**
 * Requests calculated nutrients for a product and portion size
 */
export const getNutrients = async (foodId: string, portionSizeG: number): Promise<Nutrients> => {
  return httpClient
    .get(`foods/${foodId}/nutrients?gram=${portionSizeG}`)
    .json();
};

/**
 * React Query hook to recalculate nutrients when product or portion changes
 */
export const useGetNutrients = (
  foodId?: string,
  portionSizeG?: number,
): UseQueryResult<Nutrients, unknown> => {
  return useQuery({
    queryKey: [queryKeys.foodNutrients, foodId, portionSizeG],
    queryFn: () => getNutrients(foodId as string, portionSizeG as number),
    enabled: !!(foodId && portionSizeG),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });
};

