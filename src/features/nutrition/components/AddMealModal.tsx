import React, { useEffect } from 'react';
import { Button, DatePicker, Form, Input, Modal, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { CreateMealItemPayload, CreateMealPayload } from '../models/nutrition.interface';
import { MealItemSourceType, MealType } from '@agranom/boykom-common';
import { mealTypeOptions } from '../const/meal-type-options';
import { validationMessages } from '../../../translations/validation-messages.translations';
import MenuItemForm from './MenuItemForm';

interface MealFormValues {
  title: string;
  datetime: Dayjs;
  items: Array<{
    key: string;
    value: string;
    portionSize: number;
    isUserDish: boolean;
  }>;
}



const DEFAULT_PORTION_SIZE = 250;

interface AddMealModalProps {
  selectedType: MealType | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateMealPayload) => void;
}

const formatDefaultTitle = (entryType: MealType | null, datetime: Dayjs | null): string => {
  if (entryType == null || !datetime) {
    return '';
  }
  const typeLabel = mealTypeOptions.find((option) => option.value === entryType)?.label || '';
  const formattedDate = datetime.format('DD.MM.YYYY HH:mm');
  return `${typeLabel} в ${formattedDate}`;
};

export const AddMealModal: React.FC<AddMealModalProps> = ({
                                                                                selectedType,
                                                                                isSubmitting,
                                                                                onClose,
                                                                                onSubmit,
                                                                              }) => {
  const [form] = Form.useForm<MealFormValues>();
  useEffect(() => {
      const defaultDatetime = dayjs();
      const defaultTitle = formatDefaultTitle(selectedType, defaultDatetime);
      form.setFieldsValue({
        datetime: defaultDatetime,
        title: defaultTitle,
        items: [{ key: '', value: '', portionSize: DEFAULT_PORTION_SIZE }],
      });
  }, [selectedType, form]);
  const handleDatetimeChange = (date: Dayjs | null): void => {
    if (date) {
      form.setFieldsValue({
        datetime: date,
        title: formatDefaultTitle(selectedType, date),
      });
    }
  };
  const handleSubmit = async (): Promise<void> => {
    if (selectedType == null) {
      return;
    }
    const formValues = form.getFieldsValue();
    if (!formValues.items || formValues.items.length === 0) {
      return;
    }
    const items: CreateMealItemPayload[] = formValues.items.map(item => ({
      sourceKey: item.key,
      sourceType: item.isUserDish ? MealItemSourceType.UserDish : MealItemSourceType.FoodProduct,
      name: item.value,
      grams: Number(item.portionSize),
    }));

    onSubmit({
      title: formValues.title,
      type: selectedType,
      eatenAt: formValues.datetime.toDate(),
      items,
    });
  };
  const handleClose = (): void => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={selectedType !== null ? `Добавить ${mealTypeOptions.find((option) => option.value === selectedType)?.label}` : 'Add meal'}
      open={true}
      onCancel={handleClose}
      footer={
        <Space>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="primary"
            onClick={() => form.submit()}
            loading={isSubmitting}
          >
            Submit
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
          label="Заголовок"
          name="title"
          rules={[{ required: true, message: validationMessages.required }]}
        >
          <Input placeholder="Enter title"/>
        </Form.Item>
        <Form.Item
          label="Дата и время"
          name="datetime"
          rules={[{ required: true, message: validationMessages.required }]}
        >
          <DatePicker
            showTime
            format="DD.MM.YYYY HH:mm"
            style={{ width: '100%' }}
            onChange={handleDatetimeChange}
          />
        </Form.Item>
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <MenuItemForm
                  key={field.key}
                  field={field}
                  remove={remove}
                  isFirstItem={field.name === 0}
                />
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add({ foodId: '', name: '', portionSize: DEFAULT_PORTION_SIZE })}
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

