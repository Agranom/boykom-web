import { Nutrients } from '@agranom/boykom-common';

/**
 * Interface for nutrition product data from autocomplete
 */
export interface FoodAutocomplete {
  key: string;
  value: string;
  isUserDish: boolean;
}

export interface FoodNutrients {
  key: string;
  nutrients: Nutrients;
}
