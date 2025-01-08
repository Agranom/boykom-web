export enum eMeasurementUnit {
  Kilogram = 0,
  Gram = 1,
  Liter = 2,
  Millilitre = 3,
  Tablespoon = 4,
  Teaspoon = 5,
  Cup,
  Pound,
}

export interface IRecipeIngredient {
  name: string;
  quantity?: number;
  measurementUnit?: eMeasurementUnit;
}

export interface IRecipe {
  id: string;
  title: string;
  description: string;
  cookingMethod: string;
  ingredients: IRecipeIngredient[];
  imageUrl?: string;
  cookingTime?: number;
}

export interface IUserRecipe extends Omit<IRecipe, 'ingredients'> {
}
