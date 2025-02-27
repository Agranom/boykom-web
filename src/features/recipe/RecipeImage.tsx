import { clx } from '../../utils/styles.utils';
import styles from './RecipeImage.module.scss';
import { RestaurantMenu } from '@mui/icons-material';
import { CardMedia } from '@mui/material';

type RecipeImageProps = {
  imageUrl?: string;
  alt?: string;
}

const noImage = <div className={clx(styles.recipeImage, styles.recipeImagePlaceholder)}>
  <RestaurantMenu className={styles.recipeImageIcon}/>
</div>;

const RecipeImage = ({imageUrl, alt}: RecipeImageProps) => {
  return <>
    {imageUrl ? <CardMedia
        className={styles.recipeImage}
        component="img"
        image={imageUrl}
        alt={alt}
      />
      : noImage}
  </>
}

export default RecipeImage;