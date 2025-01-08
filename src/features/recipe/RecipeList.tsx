import RecipeItem from './RecipeItem';
import styles from './RecipeList.module.scss';
import { IUserRecipe } from './models/recipe';

type RecipeListProps = {
  recipes: IUserRecipe[];
}

const RecipeList = ({ recipes }: RecipeListProps) => {
  return (
    <div className={styles.recipeList}>
      {recipes.map(recipe => <RecipeItem key={recipe.id} recipe={recipe}/>)}
    </div>
  );
};

export default RecipeList;
