import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { queryClient } from '../../../config/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { Meal } from '../models/nutrition.interface';

/**
 * Deletes a meal by ID
 */
export const deleteMeal = (id: string): Promise<void> => {
  return httpClient.delete(`meals/${id}`).json();
};

/**
 * React Query hook to delete a meal with optimistic updates
 */
export const useDeleteMeal = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
} = {}): UseMutationResult<void, unknown, string> => {
  return useMutation({
    onMutate: async (mealId: string) => {
      await queryClient.cancelQueries({ queryKey: [queryKeys.meals] });

      const queryCache = queryClient.getQueryCache();
      const mealsQueries = queryCache.findAll({ queryKey: [queryKeys.meals] });

      const previousMealsData = mealsQueries.map((query) => ({
        queryKey: query.queryKey,
        data: query.state.data,
      }));

      mealsQueries.forEach((query) => {
        const currentMeals = query.state.data as Meal[] | undefined;
        if (currentMeals) {
          const updatedMeals = currentMeals.filter((meal) => meal.id !== mealId);
          queryClient.setQueryData(query.queryKey, updatedMeals);
        }
      });

      return { previousMealsData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.meals], refetchType: 'none' });
      onSuccess?.();
    },
    onError: (error, _, context) => {
      if (context?.previousMealsData) {
        context.previousMealsData.forEach(({ queryKey, data }) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      onError?.();
    },
    mutationFn: deleteMeal,
  });
};

