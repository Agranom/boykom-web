import RecipeList from './RecipeList';
import styles from './Recipe.module.scss';
import { useUserRecipes } from './api/get-recipes';
import LoaderLayout from '../../shared/LoaderLayout';
import RecipeManagement from './RecipeManagement';
import { eSocketEvent, useSocketEvent } from '../../hooks/use-socket';
import { useLoading } from '../../hooks/use-loading';
import { useAlert } from '../../hooks/use-alert';

const Recipe = () => {
  const { data, isLoading, refetch } = useUserRecipes();
  const { setLoading } = useLoading();
  const { showError, showSuccess } = useAlert();

  useSocketEvent(eSocketEvent.RecipeGenerated, async (payload?: { success: boolean }) => {
    setLoading(false);

    if (payload?.success) {
      showSuccess('Рецепт успешно добавлен.');
      await refetch();
    } else {
      showError('Не удалось сгенерировать рецепт');
    }
  });


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
