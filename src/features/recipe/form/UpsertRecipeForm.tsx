import React from 'react';
import { useForm } from 'antd/es/form/Form';
import { Form, Input, Modal } from 'antd';
import { Button } from '@mui/material';
import style from './UpsertRecipeForm.module.scss';
import RecipeIngredients from './RecipeIngredients';
import { IRecipe, IRecipeIngredient } from '../models/recipe';

type UpsertRecipeFormProps = {
  recipe?: IRecipe;
  onCancel: () => void;
  onConfirm: (value: RecipeFormValue) => void;
  onDelete: () => void;
  isLoading: boolean;
}

export interface RecipeFormValue {
  title: string;
  description: string;
  cookingMethod: string;
  ingredients: IRecipeIngredient[];
  portionsCount?: number;
}

const requiredMessage = 'Обязательное поле';

const UpsertRecipeForm = ({ recipe, onCancel, onConfirm, onDelete, isLoading }: UpsertRecipeFormProps) => {
  const [form] = useForm<RecipeFormValue>();
  const { title, description, ingredients, cookingMethod, portionsCount } = recipe || {};
  const initialFormValue: RecipeFormValue = {
    title: title || '',
    description: description || '',
    cookingMethod: cookingMethod || '',
    portionsCount,
    ingredients: ingredients || [
      { name: '', amount: '' },
    ],
  };

  const submitHandler = (value: RecipeFormValue) => {
    onConfirm(value);
  };

  const deleteHandler = () => {
    Modal.confirm({
      title: 'Вы уверены, что хотите удалить рецепт?',
      okText: 'Да',
      cancelText: 'Нет',
      okButtonProps: {
        type: 'default',
      },
      onOk() {
        onDelete();
      },
    });
  }

  return <Form onFinish={submitHandler}
               layout={'vertical'}
               form={form}
               initialValues={initialFormValue}
               disabled={isLoading}
  >
    <Form.Item name="title" label="Название" rules={[
      { required: true, message: requiredMessage },
      { max: 100, message: 'Текст должен быть меньше 100 символов' },
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
      { max: 2000, message: 'Текст должен быть меньше 2000 символов' },
    ]}>
      <Input.TextArea rows={5} placeholder="Распишите способ приготовления"/>
    </Form.Item>

    <Form.Item name="portionsCount" label="Количество порций">
      <Input type={'number'} placeholder="2" min="1"/>
    </Form.Item>

    <div className={style.formActions}>
      {!!recipe && <Button size="large" type="button" variant="outlined" color="error" onClick={deleteHandler}>Удалить</Button>}
      <Button size="large" type="button" variant="outlined" onClick={onCancel}>Отменить</Button>
      <Button size="large" type="submit" variant="contained">Сохранить</Button>
    </div>
  </Form>;
};

export default UpsertRecipeForm;
