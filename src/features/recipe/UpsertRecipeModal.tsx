import { Modal } from 'antd';
import UpsertRecipeForm, { RecipeFormValue } from './form/UpsertRecipeForm';
import { useCreateRecipe } from './api/create-recipe';
import { IRecipe } from './models/recipe';
import { useUpdateRecipe } from './api/update-recipe';
import { useDeleteRecipe } from './api/delete-recipe';
import { useNavigate } from 'react-router-dom';
import { eAppRoutes } from '../../const/app-routes.enum';

type UpsertRecipeModalProps = {
  onClose: () => void;
  recipe?: IRecipe;
}

const UpsertRecipeModal = ({ onClose, recipe }: UpsertRecipeModalProps) => {
  const navigate = useNavigate();
  const { mutate: createRecipe, isLoading: isCreating } = useCreateRecipe({
    onSuccess: () => {
      onClose();
    },
  });
  const { mutate: updateRecipe, isLoading: isUpdating } = useUpdateRecipe({
    onSuccess: () => {
      onClose();
    },
  });
  const { mutate: deleteRecipe, isLoading: isDeleting } = useDeleteRecipe({
    onSuccess: () => {
      onClose();
      navigate(`/${eAppRoutes.Recipes}`);
    },
  });

  const confirmFormHandler = ({ title, cookingTime, cookingMethod, description, ingredients }: RecipeFormValue) => {
    const payload = {
      title,
      description,
      cookingMethod,
      ingredients: ingredients.map(i => ({ ...i, quantity: i.quantity ? Number(i.quantity) : undefined })),
      cookingTime: cookingTime ? Number(cookingTime) : undefined,
    };

    if (recipe) {
      updateRecipe({ ...payload, id: recipe.id });
    } else {
      createRecipe(payload);
    }
  };

  const deleteHandler = () => {
    deleteRecipe(recipe!.id);
  };

  return <Modal
    open={true}
    onCancel={onClose}
    title={<h2 style={{ margin: 0 }}>Рецепт</h2>}
    footer={false}
  >
    <UpsertRecipeForm recipe={recipe}
                      onCancel={onClose}
                      onConfirm={confirmFormHandler}
                      onDelete={deleteHandler}
                      isLoading={isCreating || isUpdating || isDeleting}/>
  </Modal>;
};

export default UpsertRecipeModal;