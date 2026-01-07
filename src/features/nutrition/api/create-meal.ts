import { useMutation, UseMutationResult } from '@tanstack/react-query';
import httpClient from '../../../services/http-client';
import { CreateMealPayload } from '../models/nutrition.interface';

/**
 * Creates a new meal entry
 */
export const createMeal = (payload: CreateMealPayload): Promise<unknown> => {
  return httpClient.post('meals', { json: payload }).json();
};

export const useCreateMeal = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}): UseMutationResult<unknown, unknown, CreateMealPayload> => {
  return useMutation({
    mutationFn: createMeal,
    onSuccess,
    onError,
  });
};

