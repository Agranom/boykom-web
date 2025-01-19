import { Modal } from 'antd';
import UpsertRecipeForm from './form/UpsertRecipeForm';
import { IRecipe } from './models/recipe';

type UpsertRecipeModalProps = {
  onClose: () => void;
  recipe?: IRecipe;
}

const UpsertRecipeModal = ({ onClose, recipe }: UpsertRecipeModalProps) => {

  return <Modal
    open={true}
    onCancel={onClose}
    title={<h2 style={{ margin: 0 }}>Рецепт</h2>}
    footer={false}
  >
    <UpsertRecipeForm recipe={recipe}
                      closeModal={onClose}/>
  </Modal>;
};

export default UpsertRecipeModal;