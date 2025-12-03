import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useRecipeById } from './api/get-recipe';
import LoaderLayout from '../../shared/LoaderLayout';
import styles from './RecipeDetails.module.scss';
import RecipeImage from './RecipeImage';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import RecipeManagement from './RecipeManagement';
import RecipeVideo from './RecipeVideo';
import { Button } from 'antd';
import { IRecipeIngredient } from './models/recipe';
import IngredientsModal from './IngredientsModal';
import { useAddIngredientsToGrocery } from './api/add-ingredients-to-grocery';
import { useAlert } from '../../hooks/use-alert';
import RecipeDetailsView from './RecipeDetailsView';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate: addIngredientsToGrocery } = useAddIngredientsToGrocery({
    onSuccess: () => {
      showSuccess('Ингридиенты успешно добавлены')
    }
  }
  );
  const { data: recipe, isLoading } = useRecipeById(id!);
  const { showSuccess } = useAlert()
  const { imageUrl, instructions, ingredients, description, title, portionsCount, videoUrl } = recipe || {};

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const backClickHandler = () => navigate('..', { relative: 'path' });

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmitIngredients = (selectedIngredients: IRecipeIngredient[]) => {
    const ingredientIds = selectedIngredients.map(({ id }) => id);
    addIngredientsToGrocery({ recipeId: id!, ingredientIds });
  };

  return <LoaderLayout isLoading={isLoading}>
    <div className={styles.recipeDetails}>
      <div className={styles.recipeDetailsHoryzontal}>
        <IconButton onClick={backClickHandler} size="small">
          <ArrowBack fontSize="large" />
        </IconButton>
      </div>
      {recipe && <RecipeDetailsView recipe={recipe} openIngredientsModal={openModal} />}
      <RecipeManagement data={recipe} />

      <IngredientsModal
        isVisible={isModalVisible}
        ingredients={ingredients || []}
        onClose={closeModal}
        onSubmit={handleSubmitIngredients}
      />
    </div>
  </LoaderLayout>;
};

export default RecipeDetails;