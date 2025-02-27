export interface IRecipeIngredient {
  name: string;
  amount: string;
}

export interface IRecipeInstruction {
  step: number;
  text: string;
  videoStartTime?: string;
  videoEndTime?: string;
  imageUrl: string;
}

export interface IRecipe {
  id: string;
  title: string;
  description: string;
  ingredients: IRecipeIngredient[];
  instructions?: IRecipeInstruction[];
  imageUrl?: string;
  videoUrl?: string;
  portionsCount?: number;
}

export interface IUserRecipe extends Omit<IRecipe, 'ingredients' | 'instructions'> {
}
