import { Modal } from 'antd';
import UpsertRecipeForm, { RecipeFormValue } from './form/UpsertRecipeForm';
import { useCreateRecipe } from './api/create-recipe';

type UpsertRecipeModalProps = {
  isOpened: boolean;
  onClose: () => void;
}

const UpsertRecipeModal = ({ isOpened, onClose }: UpsertRecipeModalProps) => {
  const { mutate: createRecipe } = useCreateRecipe({
    onSuccess: () => {
      onClose();
    },
  });

  const confirmFormHandler = ({ title, cookingTime, cookingMethod, description, ingredients }: RecipeFormValue) => {
    createRecipe({
      title,
      description,
      cookingMethod,
      ingredients: ingredients.map(i => ({ ...i, quantity: i.quantity ? Number(i.quantity) : undefined })),
      cookingTime: cookingTime ? Number(cookingTime) : undefined,
    });
  };

  return <Modal
    open={true}
    onCancel={onClose}
    title={<h2 style={{ margin: 0 }}>Рецепт</h2>}
    footer={false}
  >
    <UpsertRecipeForm onCancel={onClose} onConfirm={confirmFormHandler}/>
  </Modal>;
};

export default UpsertRecipeModal;