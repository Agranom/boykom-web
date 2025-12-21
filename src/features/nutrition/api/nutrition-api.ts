import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { NutritionProduct } from '../models/nutrition.interface';

/**
 * Fetches autocomplete suggestions for nutrition products
 * @param query The search query string
 * @returns Promise with nutrition product suggestions
 */
export const getNutritionAutocomplete = async (query: string): Promise<NutritionProduct[]> => {
  if (!query || query.length < 2) {
    return [];
  }

  const searchParams = new URLSearchParams({ query });
  return httpClient.get(`nutrition/products/autocomplete?${searchParams}`).json();
};

/**
 * React Query hook for nutrition autocomplete
 * @param query The search query string
 * @returns Query result with nutrition product suggestions
 */
export const useNutritionAutocomplete = (query: string) => {
  return useQuery({
    queryKey: [queryKeys.nutritionAutocomplete, query],
    queryFn: () => getNutritionAutocomplete(query),
    enabled: !!query && query.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,
  });
};
