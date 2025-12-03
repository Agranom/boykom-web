import styles from './RecipeDetails.module.scss';
import RecipeImage from './RecipeImage';
import RecipeVideo from './RecipeVideo';
import { Button } from 'antd';
import { IRecipe } from './models/recipe';

type RecipeDetailsViewProps = {
  recipe: IRecipe;
  openIngredientsModal?: () => void;
}

const RecipeDetailsView = ({ recipe, openIngredientsModal }: RecipeDetailsViewProps) => {
  const { imageUrl, instructions, ingredients, description, title, portionsCount, videoUrl } = recipe || {};

  return <>
    <div className={styles.recipeDetails}>
      <h2>{title}</h2>
      <div className={styles.recipeDetailsHoryzontal}>
        <RecipeImage imageUrl={imageUrl} />
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
        {openIngredientsModal && <Button
          type="primary"
          onClick={openIngredientsModal}
          style={{ marginTop: '1rem' }}
        >
          Добавить в покупки
        </Button>}
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
                <strong>{`Шаг ${instruction.step}:`}</strong> {instruction.text}
              </li>
            ))}
          </ol>}
      </div>
    </div>
  </>
};

export default RecipeDetailsView;