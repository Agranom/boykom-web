import RecipeList from './RecipeList';
import styles from './Recipe.module.scss';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import UpsertRecipeModal from './UpsertRecipeModal';
import { useUserRecipes } from './api/get-recipes';
import LoaderLayout from '../../shared/LoaderLayout';

const Recipe = () => {
  const { data, isLoading } = useUserRecipes();
  const [isUpsertModalOpened, setIsUpsertModalOpened] = useState(false);
  const openUpsertModal = () => {
    setIsUpsertModalOpened(true);
  };

  const closeUpsertModal = () => {
    setIsUpsertModalOpened(false);
  };

  return (
    <div className={styles.recipe}>
      <LoaderLayout isLoading={isLoading}>

        {data && <RecipeList recipes={data}/>}

        <Fab sx={{ position: 'absolute', bottom: '80px', right: '16px', zIndex: 1 }}
             onClick={openUpsertModal}
             color={'primary'}
             aria-label="Add">
          <Add/>
        </Fab>
      </LoaderLayout>
      {isUpsertModalOpened && <UpsertRecipeModal isOpened={isUpsertModalOpened} onClose={closeUpsertModal}/>}
    </div>
  );
};

export default Recipe;
