import { IGroceryItem } from './models/grocery-item';
import { groupBy } from 'lodash';
import RecipeGroceryGroup from './RecipeGroceryGroup';

type RecipeGroceriesProps = {
    groceries: IGroceryItem[];
};

const RecipeGroceries = ({ groceries }: RecipeGroceriesProps) => {
    const groupedByRecipe = groupBy(groceries.filter(g => !!g.recipeId), 'recipeId')

    return <>
        {Object.entries(groupedByRecipe)
            .map(([recipeId, groceries]) => <RecipeGroceryGroup key={recipeId} recipeId={recipeId} groceries={groceries} />)}
    </>
};

export default RecipeGroceries;