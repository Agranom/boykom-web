import { Form } from 'antd';
import RecipeInstructionField from './RecipeInstructionField';

const RecipeInstructions = () => {
  return (
    <Form.List name="instructions">
      {(fields, { add, remove }) => (
        <>
          {fields.map((page, i) => <RecipeInstructionField
            step={i + 1}
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

export default RecipeInstructions;