import { useForm } from 'antd/es/form/Form';
import { Form, Input, Modal } from 'antd';
import { validationMessages } from '../../translations/validation-messages.translations';
import { Button } from '@mui/material';
import React from 'react';

interface FormValue {
  postUrl: string;
}

type GenerateRecipeModalProps = {
  onCancel: () => void;
  onSubmit: (postUrl: string) => void;
}

const GenerateRecipeModal = ({ onSubmit, onCancel }: GenerateRecipeModalProps) => {
  const [form] = useForm<FormValue>();

  const submitHandler = ({ postUrl }: FormValue) => {
    onSubmit(postUrl);
  }

  return <Modal title="Сгенерировать рецепт" open={true} footer={false} onCancel={onCancel}>
    <p>Возможность автоматического создания рецепта из публикации Instagram.</p>
    <Form form={form} onFinish={submitHandler}>
      <Form.Item label="Ссылка на публикацию" name="postUrl" rules={[{
        required: true,
        message: validationMessages.required,
      }, {
        pattern: /^https:\/\/(www\.)?instagram\.com/,
        message: validationMessages.invalidFormat,
      }]}>
        <Input placeholder="https://www.instagram.com/..."/>
      </Form.Item>
      <Button size="large" type="submit" variant="contained">Сгенерировать</Button>
    </Form>
  </Modal>;
};

export default GenerateRecipeModal;