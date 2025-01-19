import React, { useState } from 'react';
import UpsertRecipeModal from './UpsertRecipeModal';
import { Add, Edit } from '@mui/icons-material';
import { Fab, Menu, MenuItem } from '@mui/material';
import { IRecipe } from './models/recipe';
import GenerateRecipeModal from './GenerateRecipeModal';
import { useGenerateRecipeFromInstagram } from './api/generate-recipe';
import { useLoading } from '../../hooks/use-loading';
import { eSocketEvent, useSocketEvent } from '../../hooks/use-socket';
import { useAlert } from '../../hooks/use-alert';

type RecipeManagementProps = {
  data?: IRecipe;
}

const RecipeManagement = ({ data }: RecipeManagementProps) => {
  const [isUpsertModalOpened, setIsUpsertModalOpened] = useState(false);
  const [isGenerateModalOpened, setIsGenerateModalOpened] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [recipe, setRecipe] = useState<IRecipe | undefined>(data);
  const { setLoading } = useLoading();
  const { showError } = useAlert();
  const onGenerateRecipeApiSuccess = () => {
    closeGenerateModal();
    setLoading(true);
  };

  const {
    mutate: generateFromInstagram,
  } = useGenerateRecipeFromInstagram({ onSuccess: onGenerateRecipeApiSuccess });
  const open = !!anchorEl;

  useSocketEvent(eSocketEvent.RecipeGenerated, (payload?: IRecipe) => {
    setLoading(false);

    if (payload) {
      setRecipe(payload);
      setIsUpsertModalOpened(true);
    } else {
      showError('Не удалось сгенерировать рецепт');
    }
  });

  const openUpsertModal = () => {
    setIsUpsertModalOpened(true);
    handleMenuClose();
  };

  const openGenerateModal = () => {
    setIsGenerateModalOpened(true);
    handleMenuClose();
  };

  const closeUpsertModal = () => {
    setIsUpsertModalOpened(false);
    setRecipe(undefined);
  };

  const closeGenerateModal = () => {
    setIsGenerateModalOpened(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (recipe) {
      openUpsertModal();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const generateRecipeSubmitHandler = (postUrl: string) => {
    generateFromInstagram(postUrl);
  };

  return (<>
    <Fab onClick={handleClick}
         color="primary"
         size="medium"
         aria-controls={open ? 'recipe-management-menu' : undefined}
         aria-haspopup="true"
         aria-expanded={open ? 'true' : undefined}
         sx={{ alignSelf: 'flex-end', flexShrink: 0, marginTop: 'auto', zIndex: 1 }}>
      {!recipe?.id ? <Add fontSize="large"/> : <Edit fontSize="large"/>}
    </Fab>
    <Menu
      id="recipe-management-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={openUpsertModal}>Вручную</MenuItem>
      <MenuItem onClick={openGenerateModal}>Из инстаграма</MenuItem>
    </Menu>
    {isUpsertModalOpened && <UpsertRecipeModal recipe={recipe} onClose={closeUpsertModal}/>}
    {isGenerateModalOpened &&
      <GenerateRecipeModal onCancel={closeGenerateModal} onSubmit={generateRecipeSubmitHandler}/>}
  </>);
};

export default RecipeManagement;