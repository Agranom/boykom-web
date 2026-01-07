import { MealType } from '@agranom/boykom-common';

/**
 * Interface for nutrition product data from autocomplete
 */
export interface FoodAutocomplete {
  foodId: string;
  name: string;
}

/**
 * Meal item payload
 */
export interface CreateMealItemPayload {
  foodId: string;
  foodName: string;
  gram: number;
}

/**
 * Payload for creating a meal entry
 */
export interface CreateMealPayload {
  title: string;
  type: MealType;
  datetime: Date;
  items: CreateMealItemPayload[];
}
