import React from 'react';
import { useForm } from 'antd/es/form/Form';
import { Form, Input } from 'antd';
import { Button } from '@mui/material';
import style from './UpsertRecipeForm.module.scss';
import RecipeIngredients from './RecipeIngredients';
import { IRecipeIngredient } from '../models/recipe';

type UpsertRecipeFormProps = {
  onCancel: () => void;
  onConfirm: (value: RecipeFormValue) => void;
}

export interface RecipeFormValue {
  title: string;
  description: string;
  cookingMethod: string;
  ingredients: IRecipeIngredient[];
  cookingTime?: string;
}

const requiredMessage = 'Обязательное поле';

const UpsertRecipeForm = ({ onCancel, onConfirm }: UpsertRecipeFormProps) => {
  const [form] = useForm<RecipeFormValue>();
  const initialFormValue: RecipeFormValue = {
    title: '',
    description: '',
    cookingMethod: '',
    ingredients: [
      { name: '', quantity: undefined, measurementUnit: undefined },
    ],
  };

  const submitHandler = (value: RecipeFormValue) => {
    onConfirm(value);
  };

  return <Form onFinish={submitHandler} layout={'vertical'} form={form} initialValues={initialFormValue}>
    <Form.Item name="title" label="Название" rules={[
      { required: true, message: requiredMessage },
      { max: 30, message: 'Текст должен быть меньше 30 символов' },
    ]}>
      <Input placeholder="Введите название"/>
    </Form.Item>

    <Form.Item name="description" label="Описание" rules={[
      { required: true, message: requiredMessage },
      { max: 200, message: 'Текст должен быть меньше 200 символов' },
    ]}>
      <Input.TextArea rows={5} placeholder="Добавьте описание"/>
    </Form.Item>

    <h3 style={{ marginTop: 0 }}>Ингредиенты:</h3>

    <RecipeIngredients/>

    <Form.Item name="cookingMethod" label="Способ приготовления" rules={[
      { required: true, message: requiredMessage },
      { max: 400, message: 'Текст должен быть меньше 400 символов' },
    ]}>
      <Input.TextArea rows={5} placeholder="Распишите способ приготовления"/>
    </Form.Item>

    <Form.Item name="cookingTime" label="Время приготовления" extra="(в минутах)">
      <Input type={'number'} placeholder="60" min="0"/>
    </Form.Item>

    <div className={style.formActions}>
      <Button size="large" type="button" variant="outlined" onClick={onCancel}>Отменить</Button>
      <Button size="large" type="submit" variant="contained">Сохранить</Button>
    </div>
  </Form>;
};

export default UpsertRecipeForm;
