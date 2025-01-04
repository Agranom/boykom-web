import { Form, FormListFieldData, Input, Select } from 'antd';
import { eMeasurementUnit } from '../models/recipe';
import styles from './RecipeIngredientField.module.scss';
import { IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

type RecipeIngredientFieldProps = {
  isFirstItem: boolean;
  field: FormListFieldData;
  remove: (index: number | number[]) => void;
  add: () => void;
}

const measurementUnits = [
  { value: eMeasurementUnit.Kilogram, label: 'кг' },
  { value: eMeasurementUnit.Gram, label: 'г' },
  { value: eMeasurementUnit.Liter, label: 'л' },
  { value: eMeasurementUnit.Millilitre, label: 'мл' },
  { value: eMeasurementUnit.Tablespoon, label: 'ст. л.' },
  { value: eMeasurementUnit.Teaspoon, label: 'ч. л.' },
  { value: eMeasurementUnit.Cup, label: 'стакан' },
  { value: eMeasurementUnit.Pound, label: 'фунт' },
];

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
        { max: 30, message: 'Текст должен быть меньше 30 символов' },
      ]}
    >
      <Input placeholder="Репчатый лук"/>
    </Form.Item>

    <Form.Item
      {...restField}
      name={[fieldName, 'quantity']}
      label={isFirstItem ? 'Кол.' : ''}
    >
      <Input type="number" placeholder="1" min="0"/>
    </Form.Item>

    <Form.Item
      {...restField}
      name={[fieldName, 'measurementUnit']}
      label={isFirstItem ? 'Ед. изм.' : ''}
    >
      <Select placeholder="кг" options={measurementUnits}/>
    </Form.Item>

    <IconButton type="button" sx={{ padding: 0 }} onClick={isFirstItem ? addHandler : removeHandler}>
      {isFirstItem ? <Add/> : <Delete/>}
    </IconButton>
  </div>;
};

export default RecipeIngredientField;