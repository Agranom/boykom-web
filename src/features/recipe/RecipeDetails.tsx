import { useNavigate, useParams } from 'react-router-dom';
import { useRecipeById } from './api/get-recipe';
import LoaderLayout from '../../shared/LoaderLayout';
import styles from './RecipeDetails.module.scss';
import RecipeImage from './RecipeImage';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import RecipeManagement from './RecipeManagement';
import RecipeVideo from './RecipeVideo';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: recipe, isLoading } = useRecipeById(id!);
  const { imageUrl, instructions, ingredients, description, title, portionsCount, videoUrl } = recipe || {};

  const backClickHandler = () => navigate('..', { relative: 'path' });

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
    </div>
  </LoaderLayout>;
};

export default RecipeDetails;