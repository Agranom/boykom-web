import { IGroceryItem } from './models/grocery-item';
import styles from './GroceryCategory.module.scss';
import { useRecipeById } from '../recipe/api/get-recipe';
import GroceriesList from './GroceriesList';
import { Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { eAppRoutes } from '../../const/app-routes.enum';

type RecipeGroceryGroupProps = {
    recipeId: string;
    groceries: IGroceryItem[];
};

const RecipeGroceryGroup = ({ recipeId, groceries }: RecipeGroceryGroupProps) => {
    const { data: recipe } = useRecipeById(recipeId);


    return recipe ? (
        <div className={styles.groceryCategoryGroup} key={recipeId}>
            <span className={styles.groceryCategoryGroupLabel}>
                <Tooltip title={recipe.title}>
                    <Link to={`/${eAppRoutes.Recipes}/${recipe.id}`}> {recipe.title}</Link>
                </Tooltip>
            </span>
            <GroceriesList data={groceries} />
        </div>
    ) : null;
};

export default RecipeGroceryGroup;