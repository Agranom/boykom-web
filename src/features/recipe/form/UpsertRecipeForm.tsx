import React from 'react';
import { useForm } from 'antd/es/form/Form';
import { Form, Input, Modal } from 'antd';
import { Button } from '@mui/material';
import style from './UpsertRecipeForm.module.scss';
import RecipeIngredients from './RecipeIngredients';
import { IRecipe, IRecipeIngredient } from '../models/recipe';
import { useNavigate } from 'react-router-dom';
import { useCreateRecipe } from '../api/create-recipe';
import { useUpdateRecipe } from '../api/update-recipe';
import { useDeleteRecipe } from '../api/delete-recipe';
import { eAppRoutes } from '../../../const/app-routes.enum';
import { validationMessages } from '../../../translations/validation-messages.translations';

type UpsertRecipeFormProps = {
  recipe?: IRecipe;
  closeModal: () => void;
}

export interface RecipeFormValue {
  title: string;
  description: string;
  ingredients: IRecipeIngredient[];
  portionsCount?: number;
}

const requiredMessage = validationMessages.required;

const UpsertRecipeForm = ({ recipe, closeModal }: UpsertRecipeFormProps) => {
  const { title, description, ingredients, portionsCount } = recipe || {};

  const [form] = useForm<RecipeFormValue>();
  const navigate = useNavigate();
  const { mutate: createRecipe, isLoading: isCreating } = useCreateRecipe({
    onSuccess: () => {
      closeModal();
    },
  });
  const { mutate: updateRecipe, isLoading: isUpdating } = useUpdateRecipe({
    onSuccess: () => {
      closeModal();
    },
  });
  const { mutate: deleteRecipe, isLoading: isDeleting } = useDeleteRecipe({
    onSuccess: () => {
      closeModal();
      navigate(`/${eAppRoutes.Recipes}`);
    },
  });

  const initialFormValue: RecipeFormValue = {
    title: title || '',
    description: description || '',
    portionsCount,
    ingredients: ingredients || [
      { name: '', amount: '' },
    ],
  };

  const submitHandler = ({ title, portionsCount, description, ingredients }: RecipeFormValue) => {
    const payload = {
      title,
      description,
      ingredients,
      portionsCount: portionsCount ? Number(portionsCount) : undefined,
    };

    if (recipe?.id) {
      updateRecipe({ ...payload, id: recipe.id });
    } else {
      createRecipe(payload);
    }
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
        deleteRecipe(recipe!.id);
      },
    });
  }

  return <Form onFinish={submitHandler}
               layout={'vertical'}
               form={form}
               initialValues={initialFormValue}
               disabled={isCreating || isUpdating || isDeleting}
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

    <Form.Item name="portionsCount" label="Количество порций">
      <Input type={'number'} placeholder="2" min="1"/>
    </Form.Item>

    <div className={style.formActions}>
      {!!recipe?.id && <Button size="large" type="button" variant="outlined" color="error" onClick={deleteHandler}>Удалить</Button>}
      <Button size="large" type="button" variant="outlined" onClick={closeModal}>Отменить</Button>
      <Button size="large" type="submit" variant="contained">Сохранить</Button>
    </div>
  </Form>;
};

export default UpsertRecipeForm;
