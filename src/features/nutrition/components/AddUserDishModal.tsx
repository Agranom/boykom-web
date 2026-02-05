import React, { useEffect } from 'react';
import { Button, Form, Input, Modal, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useCreateDish } from '../api/create-dish';
import { validationMessages } from '../../../translations/validation-messages.translations';
import { UserDish } from '../models/user-dish.interface';
import { UserDishItemForm } from './UserDishItemForm';

interface DishFormValues {
  name: string;
  items: Array<{
    key: string;
    value: string;
    portionSize: number;
    isUserDish: boolean;
  }>;
}

const DEFAULT_PORTION_SIZE = 100;

interface AddUserDishModalProps {
  onClose: () => void;
  onCreateSuccess: (dish: UserDish | null) => void;
}

const AddUserDishModal: React.FC<AddUserDishModalProps> = ({
                                                             onClose,
                                                             onCreateSuccess,
                                                           }) => {
  const [form] = Form.useForm<DishFormValues>();
  const { mutate: createDish, isLoading: isSubmitting } = useCreateDish({
    onSuccess: (userDish: UserDish) => {
      handleClose();
      onCreateSuccess(userDish);
    },
    onError: () => {
      // Error handling can be added here
    },
  });
  
  useEffect(() => {
    form.setFieldsValue({
      name: '',
      items: [{ key: '', value: '', portionSize: DEFAULT_PORTION_SIZE }],
    });
  }, [form]);

  const handleSubmit = async (): Promise<void> => {
    const formValues = form.getFieldsValue();
    if (!formValues.items || formValues.items.length === 0) {
      return;
    }
    const items = formValues.items
      .filter((item) => item.key && item.portionSize)
      .map((item) => ({
        productNumber: item.key,
        grams: Number(item.portionSize),
      }));
    createDish({
      name: formValues.name,
      items,
    });
  };
  const handleClose = (): void => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Добавить блюдо"
      open={true}
      onCancel={handleClose}
      footer={
        <Space>
          <Button onClick={handleClose}>Отмена</Button>
          <Button
            type="primary"
            onClick={() => form.submit()}
            loading={isSubmitting}
          >
            Сохранить
          </Button>
        </Space>
      }
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Название блюда"
          name="name"
          rules={[{ required: true, message: validationMessages.required }]}
        >
          <Input placeholder="Введите название блюда"/>
        </Form.Item>
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <UserDishItemForm
                  key={field.key}
                  field={field}
                  remove={remove}
                  isFirstItem={field.name === 0}
                />
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add({ key: '', value: '', portionSize: DEFAULT_PORTION_SIZE })}
                  block
                  icon={<PlusOutlined/>}
                >
                  Добавить продукт
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default AddUserDishModal;