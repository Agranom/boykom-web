import RecipeList from './RecipeList';
import styles from './Recipe.module.scss';
import { useUserRecipes } from './api/get-recipes';
import LoaderLayout from '../../shared/LoaderLayout';
import RecipeManagement from './RecipeManagement';

const Recipe = () => {
  const { data, isLoading } = useUserRecipes();


  return (
    <div className={styles.recipe}>
      <LoaderLayout isLoading={isLoading}>

        {data && <RecipeList recipes={data}/>}

        <RecipeManagement />
      </LoaderLayout>
    </div>
  );
};

export default Recipe;
