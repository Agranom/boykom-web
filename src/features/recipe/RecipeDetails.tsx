import { useNavigate, useParams } from 'react-router-dom';
import { useRecipeById } from './api/get-recipe';
import LoaderLayout from '../../shared/LoaderLayout';
import styles from './RecipeDetails.module.scss';
import RecipeImage from './RecipeImage';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import RecipeManagement from './RecipeManagement';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: recipe, isLoading } = useRecipeById(id!);
  const { imageUrl, cookingMethod, ingredients, description, title } = recipe || {};

  const backClickHandler = () => navigate('..', { relative: 'path' });

  return <LoaderLayout isLoading={isLoading}>
    <div className={styles.recipeDetails}>
      <div className={styles.recipeDetailsHoryzontal}>
        <IconButton onClick={backClickHandler} size={'small'}>
          <ArrowBack fontSize="large"/>
        </IconButton>
      </div>
      <h2>{title}</h2>
      <div className={styles.recipeDetailsHoryzontal}>
        <RecipeImage imageUrl={imageUrl}/>
        <p>{description}</p>
      </div>
      <div>
        <h4>Ингредиенты:</h4>
        <ul>
          {ingredients?.map(({ name, measurementUnit, quantity }, i) => (
            quantity ? <li key={i}>{name} - ${quantity} ${measurementUnit}</li> : <li key={i}>{name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Способ приготовления:</h4>
        <p>{cookingMethod}</p>
      </div>
      <RecipeManagement recipe={recipe} />
    </div>
  </LoaderLayout>;
};

export default RecipeDetails;