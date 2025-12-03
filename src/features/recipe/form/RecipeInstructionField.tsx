import { Form, FormListFieldData, Input } from 'antd';
import { IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

type RecipeInstructionFieldProps = {
  step: number;
  field: FormListFieldData;
  remove: (index: number | number[]) => void;
  add: () => void;
}

const RecipeInstructionField = ({ step, field, remove, add }: RecipeInstructionFieldProps) => {
  const { key, name: fieldName, ...restField } = field;
  const isFirstItem = step === 1;
  const removeHandler = () => {
    remove(fieldName);
  };

  const addHandler = () => {
    add();
  };

  return <div className="flex align-center gap-6">
    <Form.Item
      {...restField}
      name={[fieldName, 'text']}
      label={`Шаг ${step}`}
      className="w-full"
      rules={[
        { required: true, message: 'Обязательное поле' },
        { max: 1000, message: 'Текст должен быть меньше 1000 символов' },
      ]}
    >
      <Input placeholder="Нарезать лук кубиками..."/>
    </Form.Item>

    <IconButton type="button" className='w-[50px]' sx={{padding: 0}} onClick={isFirstItem ? addHandler : removeHandler}>
      {isFirstItem ? <Add/> : <Delete/>}
    </IconButton>
  </div>;
};

export default RecipeInstructionField;