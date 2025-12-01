import { IGroceryItem } from './models/grocery-item';
import styles from './GroceryCategory.module.scss';
import { useRecipeById } from '../recipe/api/get-recipe';
import GroceriesList from './GroceriesList';
import { groupBy } from 'lodash';
import RecipeGroceryGroup from './RecipeGroceryGroup';

type RecipeGroceriesProps = {
    groceries: IGroceryItem[];
};

const RecipeGroceries = ({ groceries }: RecipeGroceriesProps) => {
    const groupedByRecipe = groupBy(groceries, 'recipeId')

    return <>
        {Object.entries(groupedByRecipe)
            .map(([recipeId, groceries]) => <RecipeGroceryGroup key={recipeId} recipeId={recipeId} groceries={groceries} />)}
    </>
};

export default RecipeGroceries;