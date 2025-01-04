import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import styles from './RecipeItem.module.scss';
import { RestaurantMenu } from '@mui/icons-material';
import { clx } from '../../utils/styles.utils';
import { IUserRecipe } from './models/recipe';

type RecipeItemProps = {
  recipe: IUserRecipe;
}

const noImage = <div className={clx(styles.recipeItemMedia, styles.recipeItemMediaPlaceholder)}>
  <RestaurantMenu className={styles.recipeItemMediaIcon}/>
</div>;

const RecipeItem = ({ recipe }: RecipeItemProps) => {
  return (
    <Card sx={{ height: '180px' }}>
      <CardActionArea>
        <div className={styles.recipeItem}>
          {recipe.imageUrl ? <CardMedia
              className={styles.recipeItemMedia}
              component="img"
              image={recipe.imageUrl}
              alt="paella"
            />
            : noImage}
          <CardContent sx={{ padding: 0 }}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default RecipeItem;