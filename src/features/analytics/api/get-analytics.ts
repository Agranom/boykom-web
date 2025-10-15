import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { GroceryAnalytics, GroceryAnalyticsQuery } from '../models/analytics.interface';

export const getGroceryAnalytics = (params: GroceryAnalyticsQuery): Promise<GroceryAnalytics[]> => {
    // Convert params to proper search params format
    // startDate and endDate are already in YYYYMMDD format as numbers
    const searchParams: Record<string, string> = {
        startDate: params.startDate.toString(),
        endDate: params.endDate.toString(),
    };
    
    // Add categories if present, converting array to comma-separated string
    if (params.categories && params.categories.length > 0) {
        searchParams.categories = params.categories.join(',');
    }
    
    return httpClient.get(`analytics/family-groceries`, { searchParams }).json();
};

export const useGroceryAnalytics = (params: GroceryAnalyticsQuery) => {
    return useQuery(
        [queryKeys.analytics, params],
        () => getGroceryAnalytics(params),
        {
            enabled: !!params.startDate && !!params.endDate,
        }
    );
};
