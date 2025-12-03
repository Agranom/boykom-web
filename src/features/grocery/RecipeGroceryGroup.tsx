import { IGroceryItem } from './models/grocery-item';
import styles from './GroceryCategory.module.scss';
import { useRecipeById } from '../recipe/api/get-recipe';
import GroceriesList from './GroceriesList';
import { Modal, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { eAppRoutes } from '../../const/app-routes.enum';
import { useState } from 'react';
import RecipeDetailsView from '../recipe/RecipeDetailsView';

type RecipeGroceryGroupProps = {
    recipeId: string;
    groceries: IGroceryItem[];
};

const RecipeGroceryGroup = ({ recipeId, groceries }: RecipeGroceryGroupProps) => {
    const { data: recipe } = useRecipeById(recipeId);
    const [isRecipePreviewOpened, setIsRecipePreviewOpened] = useState(false)

    const toggleModal = (isOpened: boolean) => {
        setIsRecipePreviewOpened(isOpened)
    }


    return recipe ? (
        <div className={styles.groceryCategoryGroup} key={recipeId}>
            <button className={styles.groceryCategoryGroupLabel} onClick={() => toggleModal(true)}>
                {recipe.title}
            </button>
            <GroceriesList data={groceries} />
            <Modal
                open={isRecipePreviewOpened}
                onCancel={() => toggleModal(false)}
                footer={false}
                >
                <RecipeDetailsView recipe={recipe} />
            </Modal>
        </div>
    ) : null;
};

export default RecipeGroceryGroup;