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

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate: addIngredientsToGrocery } = useAddIngredientsToGrocery();
  const { data: recipe, isLoading } = useRecipeById(id!);
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
          <ArrowBack fontSize="large"/>
        </IconButton>
      </div>
      <h2>{title}</h2>
      <div className={styles.recipeDetailsHoryzontal}>
        <RecipeImage imageUrl={imageUrl}/>
        <div>
          <p>{description}</p>
          <div className={styles.recipeDetailsHoryzontal} style={{ alignItems: 'baseline', gap: '1rem' }}>
            <h4>Количество порций:</h4>
            <p>{portionsCount}</p>
          </div>
        </div>
      </div>
      <div>
        <h4>Ингредиенты:</h4>
        <ul>
          {ingredients?.map(({ name, amount }, i) => (
            <li key={i}>{name} - {amount}</li>
          ))}
        </ul>
        <Button 
          type="primary" 
          onClick={openModal}
          style={{ marginTop: '1rem' }}
        >
          Добавить в покупки
        </Button>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <h4>Способ приготовления:</h4>
        {videoUrl
          ? <RecipeVideo videoUrl={videoUrl} instructions={instructions || []} />
          : <ol>
          {instructions?.map((instruction, index) => (
            <li
              key={index}
            >
              {instruction.text}
            </li>
          ))}
        </ol>}
      </div>
      <RecipeManagement data={recipe}/>
      
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