import RecipeList from './RecipeList';
import styles from './Recipe.module.scss';
import { useUserRecipes } from './api/get-recipes';
import LoaderLayout from '../../shared/LoaderLayout';
import RecipeManagement from './RecipeManagement';

const Recipe = () => {
  const { data, isLoading } = useUserRecipes();

  return (
    <div className={styles.recipe}>
      <h2>Мои рецепты</h2>
      <LoaderLayout isLoading={isLoading}>

        {data && <RecipeList recipes={data}/>}

      </LoaderLayout>
      <RecipeManagement/>
    </div>
  );
};

export default Recipe;
