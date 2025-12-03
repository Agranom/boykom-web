import { useState, useEffect } from 'react';
import { Button, Modal, Checkbox, List } from 'antd';
import { IRecipeIngredient } from './models/recipe';

interface IngredientsModalProps {
  isVisible: boolean;
  ingredients: IRecipeIngredient[];
  onClose: () => void;
  onSubmit: (selectedIngredients: IRecipeIngredient[]) => void;
}

const IngredientsModal = ({ isVisible, ingredients, onClose, onSubmit }: IngredientsModalProps) => {
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);

  useEffect(() => {
    if (isVisible && ingredients) {
      setSelectedIngredients(ingredients.map((_, index) => index));
    }
  }, [isVisible, ingredients]);

  const handleIngredientChange = (index: number, checked: boolean) => {
    if (checked) {
      setSelectedIngredients(prev => [...prev, index]);
    } else {
      setSelectedIngredients(prev => prev.filter(i => i !== index));
    }
  };

  const handleSubmitIngredients = () => {
    const selectedIngredientsData = selectedIngredients.map(index => ingredients[index]);
    onSubmit(selectedIngredientsData);
    onClose();
  };

  return (
    <Modal
      title="Добавить в покупки"
      open={isVisible}
      onCancel={onClose}
      footer={[
        <Button
          key="submit"
          size="large"
          type="primary"
          onClick={handleSubmitIngredients}
          disabled={!selectedIngredients.length}
        >
          Добавить выбранные
        </Button>
      ]}
      width={600}
    >
      <List
        dataSource={ingredients}
        renderItem={(ingredient: IRecipeIngredient, index: number) => (
          <List.Item>
            <Checkbox
              checked={selectedIngredients.includes(index)}
              onChange={(e) => handleIngredientChange(index, e.target.checked)}
            >
              {ingredient.name} - {ingredient.amount}
            </Checkbox>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default IngredientsModal;
