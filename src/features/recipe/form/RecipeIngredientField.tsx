import { Form, FormListFieldData, Input } from 'antd';
import styles from './RecipeIngredientField.module.scss';
import { IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

type RecipeIngredientFieldProps = {
  isFirstItem: boolean;
  field: FormListFieldData;
  remove: (index: number | number[]) => void;
  add: () => void;
}

const RecipeIngredientField = ({ isFirstItem, field, remove, add }: RecipeIngredientFieldProps) => {
  const { key, name: fieldName, ...restField } = field;
  const removeHandler = () => {
    remove(fieldName);
  };

  const addHandler = () => {
    add();
  };

  return <div className={styles.ingredientField} style={{ alignItems: isFirstItem ? 'center' : 'baseline' }}>
    <Form.Item
      {...restField}
      name={[fieldName, 'name']}
      label={isFirstItem ? 'Наименование' : ''}
      rules={[
        { required: true, message: 'Обязательное поле' },
        { max: 50, message: 'Текст должен быть меньше 50 символов' },
      ]}
    >
      <Input placeholder="Репчатый лук"/>
    </Form.Item>

    <Form.Item
      {...restField}
      name={[fieldName, 'amount']}
      label={isFirstItem ? 'Количество' : ''}
    >
      <Input placeholder="250 г"/>
    </Form.Item>

    <IconButton type="button" sx={{ padding: 0 }} onClick={isFirstItem ? addHandler : removeHandler}>
      {isFirstItem ? <Add/> : <Delete/>}
    </IconButton>
  </div>;
};

export default RecipeIngredientField;