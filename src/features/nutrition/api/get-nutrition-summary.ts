import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { Nutrients } from '@agranom/boykom-common';

interface GetNutritionSummaryParams {
  from: Date;
  to: Date;
}

interface NutritionSummaryResponse {
  nutrients: Nutrients;
}

/**
 * Fetches nutrition summary from the API
 */
export const getNutritionSummary = async (params: GetNutritionSummaryParams): Promise<NutritionSummaryResponse> => {
  const searchParams = new URLSearchParams();
  searchParams.append('from', params.from.toISOString());
  searchParams.append('to', params.to.toISOString());
  return httpClient.get(`nutrition/summary?${searchParams.toString()}`).json();
};

/**
 * React Query hook to fetch nutrition summary
 */
export const useGetNutritionSummary = (params: GetNutritionSummaryParams): UseQueryResult<NutritionSummaryResponse, unknown> => {
  return useQuery({
    queryKey: [queryKeys.nutritionSummary],
    queryFn: () => getNutritionSummary(params),
  });
};
