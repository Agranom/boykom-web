import { useMutation, UseMutationResult } from '@tanstack/react-query';
import httpClient from '../../../services/http-client';
import { FoodProductType } from '@agranom/boykom-common';
import { FoodNutrient } from '../models/food-nutrient.interface';

export interface UpsertFoodProductPayload {
  name: string;
  type: FoodProductType;
  searchName: string;
  nutrientsPer100g: FoodNutrient[];
}

export const upsertFoodProduct = async (
  productNumber: string,
  data: UpsertFoodProductPayload,
): Promise<void> => {
  return httpClient.put(`food-products/${productNumber}`, { json: data }).json();
};

export const useUpsertFoodProduct = (): UseMutationResult<
  void,
  unknown,
  { productNumber: string; data: UpsertFoodProductPayload },
  unknown
> => {
  return useMutation({
    mutationFn: ({ productNumber, data }) => upsertFoodProduct(productNumber, data),
  });
};