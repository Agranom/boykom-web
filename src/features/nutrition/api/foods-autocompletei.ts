import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { FoodAutocomplete } from '../models/nutrition.interface';

export const getFoodsAutocomplete = async (query: string): Promise<FoodAutocomplete[]> => {
  if (!query || query.length < 2) {
    return [];
  }

  return httpClient.get(`foods/autocomplete?query=${query}`).json();
};

export const useFoodsAutocomplete = (query: string) => {
  return useQuery({
    queryKey: [queryKeys.foodsAutocomplete, query],
    queryFn: () => getFoodsAutocomplete(query),
    enabled: !!query && query.length >= 2,
    keepPreviousData: true,
  });
};
