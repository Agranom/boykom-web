export interface IRecipeIngredient {
  name: string;
  amount: string;
}

export interface IRecipe {
  id: string;
  title: string;
  description: string;
  cookingMethod: string;
  ingredients: IRecipeIngredient[];
  imageUrl?: string;
  portionsCount?: number;
}

export interface IUserRecipe extends Omit<IRecipe, 'ingredients'> {
}
