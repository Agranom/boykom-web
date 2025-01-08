import { Form } from 'antd';
import RecipeIngredientField from './RecipeIngredientField';

const RecipeIngredients = () => {
  return (
    <Form.List name="ingredients">
      {(fields, { add, remove }) => (
        <>
          {fields.map((page, i) => <RecipeIngredientField
              isFirstItem={i === 0}
              key={i}
              field={page}
              remove={remove}
              add={add}
            />,
          )}
        </>
      )}

    </Form.List>
  );
};

export default RecipeIngredients;