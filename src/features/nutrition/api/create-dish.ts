import { useMutation, UseMutationResult } from '@tanstack/react-query';
import httpClient from '../../../services/http-client';
import { UserDish } from '../models/user-dish.interface';

interface CreateDishItemPayload {
  productNumber: string;
  grams: number;
}

interface CreateDishPayload {
  name: string;
  items: CreateDishItemPayload[];
}

/**
 * Creates a new user dish
 */
export const createDish = (payload: CreateDishPayload): Promise<UserDish> => {
  return httpClient.post('user-dishes', { json: payload }).json();
};

export const useCreateDish = ({
  onSuccess,
  onError,
}: {
  onSuccess: (response: UserDish) => void;
  onError: () => void;
}): UseMutationResult<unknown, unknown, CreateDishPayload> => {
  return useMutation({
    mutationFn: createDish,
    onSuccess: (response: UserDish) => onSuccess(response),
    onError,
  });
};
