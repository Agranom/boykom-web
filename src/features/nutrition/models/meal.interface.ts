import { MealItemSourceType, MealType, Nutrients } from '@agranom/boykom-common';
import { FoodNutrient } from './food-nutrient.interface';

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
  isTemplate: boolean;
  previousTemplateId?: string;
}


export interface MealItem {
  name: string;
  grams: number;
  sourceKey: string;
  sourceType: MealItemSourceType;
  nutrients?: FoodNutrient[];
}

export interface Meal {
  id: string;
  title: string;
  type: MealType;
  eatenAt: string;
  isTemplate: boolean;
  items?: MealItem[];
}

export interface MealTemplate extends Pick<Meal, 'id' | 'title'> {
}