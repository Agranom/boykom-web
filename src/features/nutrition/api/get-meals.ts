import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { Meal } from '../models/meal.interface';
import { PaginatedResponse } from '../../../models/paginated-response.interface';
import { PaginationQuery } from '../../../models/pagination-query.interface';

interface GetMealsParams extends PaginationQuery {
  from?: Date;
  to?: Date;
}

/**
 * Fetches meals from the API
 */
export const getMeals = async (params?: GetMealsParams): Promise<Meal[]> => {
  const searchParams = new URLSearchParams();
  const { from, to, page, limit } = params || {};

  if (from) {
    searchParams.append('from', from.toISOString());
  }
  if (to) {
    searchParams.append('to', to.toISOString());
  }
  if (page) {
    searchParams.append('page', page.toString());
  }

  if (limit) {
    searchParams.append('limit', limit.toString());
  }
  const queryString = searchParams.toString();
  const url = queryString ? `meals?${queryString}` : 'meals';
  const { data } = await httpClient.get(url).json<PaginatedResponse<Meal>>();

  return data;
};

/**
 * React Query hook to fetch meals
 */
export const useGetMeals = (params?: GetMealsParams): UseQueryResult<Meal[], unknown> => {
  return useQuery({
    queryKey: [queryKeys.meals],
    queryFn: () => getMeals(params),
  });
};

