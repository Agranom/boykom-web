import { Card, CardActionArea, CardContent } from '@mui/material';
import styles from './RecipeItem.module.scss';
import { IUserRecipe } from './models/recipe';
import { useNavigate } from 'react-router-dom';
import RecipeImage from './RecipeImage';

type RecipeItemProps = {
  recipe: IUserRecipe;
}

const RecipeItem = ({ recipe }: RecipeItemProps) => {
  const navigate = useNavigate();

  const cardClickHandler = () => {
    navigate(recipe.id);
  };

  return (
    <Card sx={{ height: '120px' }}>
      <CardActionArea onClick={cardClickHandler}>
        <div className={styles.recipeItem}>
          <RecipeImage imageUrl={recipe.imageUrl}/>
          <CardContent sx={{ padding: 0 }}>
            <h3>{recipe.title}</h3>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default RecipeItem;