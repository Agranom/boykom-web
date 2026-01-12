import { MealItemSourceType, MealType, Nutrients } from '@agranom/boykom-common';

/**
 * Interface for nutrition product data from autocomplete
 */
export interface FoodAutocomplete {
  key: string;
  value: string;
  isUserDish: boolean;
}

/**
 * Meal item payload
 */
export interface CreateMealItemPayload {
  sourceKey: string;
  sourceType: MealItemSourceType;
  name: string;
  grams: number;
}

/**
 * Payload for creating a meal entry
 */
export interface CreateMealPayload {
  title: string;
  type: MealType;
  eatenAt: Date;
  items: CreateMealItemPayload[];
}

/**
 * Meal entity from the API
 */
export interface Meal {
  id: string;
  title: string;
  type: MealType;
  eatenAt: string;
}

export interface FoodNutrients {
  key: string;
  nutrients: Nutrients;
}
