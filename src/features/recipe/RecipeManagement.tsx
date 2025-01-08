import { useState } from 'react';
import UpsertRecipeModal from './UpsertRecipeModal';
import { Add, Edit } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { IRecipe } from './models/recipe';

type RecipeManagementProps = {
  recipe?: IRecipe;
}

const RecipeManagement = ({ recipe }: RecipeManagementProps) => {
  const [isUpsertModalOpened, setIsUpsertModalOpened] = useState(false);
  const openUpsertModal = () => {
    setIsUpsertModalOpened(true);
  };

  const closeUpsertModal = () => {
    setIsUpsertModalOpened(false);
  };

  return (<>
    <Fab onClick={openUpsertModal}
         color={'primary'}
         size={'medium'}
         sx={{ alignSelf: 'flex-end', flexShrink: 0, marginTop: '2rem', zIndex: 1 }}>
      {!recipe ? <Add fontSize={'large'}/> : <Edit fontSize={'large'}/>}
    </Fab>
    {isUpsertModalOpened && <UpsertRecipeModal recipe={recipe} onClose={closeUpsertModal}/>}
  </>);
};

export default RecipeManagement;