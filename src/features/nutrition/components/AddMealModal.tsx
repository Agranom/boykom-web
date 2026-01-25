import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Modal, Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { CreateMealItemPayload, Meal } from '../models/nutrition.interface';
import { MealItemSourceType, MealType } from '@agranom/boykom-common';
import { mealTypeOptions } from '../const/meal-type-options';
import { validationMessages } from '../../../translations/validation-messages.translations';
import MenuItemForm from './MenuItemForm';
import { useAlert } from '../../../hooks/use-alert';
import { useCreateMeal } from '../api/create-meal';

interface MealFormValues {
  title: string;
  datetime: Dayjs;
  type: MealType;
  items: Array<{
    key: string;
    value: string;
    portionSize: number;
    isUserDish: boolean;
  }>;
}


const DEFAULT_PORTION_SIZE = 250;

interface AddMealModalProps {
  onClose: () => void;
  selectedType?: MealType;
  meal?: Meal;
}

const formatDefaultTitle = (entryType?: MealType, datetime?: Dayjs | null): string => {
  if (entryType == null || !datetime) {
    return '';
  }
  const typeLabel = mealTypeOptions.find((option) => option.value === entryType)?.label || '';
  const formattedDate = datetime.format('DD.MM.YYYY HH:mm');
  return `${typeLabel} в ${formattedDate}`;
};

export const AddMealModal: React.FC<AddMealModalProps> = ({
                                                            selectedType,
                                                            onClose,
                                                            meal,
                                                          }) => {
  const [form] = Form.useForm<MealFormValues>();
  const [isTitleManuallyEdited, setIsTitleManuallyEdited] = useState(false);
  const { showError, showSuccess } = useAlert();
  const { mutate: submitMeal, isLoading: isSubmitting } = useCreateMeal({
    onSuccess: () => {
      onClose();
      showSuccess('Приём пищи добавлен');
    },
    onError: () => {
      showError('не удалось добавить приём пищи');
    },
  });

  useEffect(() => {
    const defaultDatetime = dayjs();
    const defaultTitle = formatDefaultTitle(selectedType, defaultDatetime);
    form.setFieldsValue(
      meal
        ? {
          datetime: defaultDatetime,
          title: meal.title,
          type: meal.type,
          items: (meal.items || []).map(item => ({
            key: item.sourceKey,
            value: item.name,
            portionSize: item.grams,
            isUserDish: item.sourceType === MealItemSourceType.UserDish,
          })),
        }
        : {
          datetime: defaultDatetime,
          title: defaultTitle,
          type: selectedType,
          items: [{ key: '', value: '', portionSize: DEFAULT_PORTION_SIZE }],
        });
    setIsTitleManuallyEdited(false); // Reset when selectedType changes
  }, [selectedType, form, meal]);

  const handleDatetimeChange = (date: Dayjs | null): void => {
    if (date) {
      form.setFieldsValue({
        datetime: date,
        // Only update title if it hasn't been manually edited
        ...(isTitleManuallyEdited ? {} : { title: formatDefaultTitle(selectedType, date) }),
      });
    }
  };

  const handleTitleChange = (): void => {
    setIsTitleManuallyEdited(true);
  };

  // Rest of your component code...
  const handleSubmit = async (): Promise<void> => {
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

    submitMeal({
      title: formValues.title,
      type: formValues.type,
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
          <Input
            placeholder="Введите заголовок"
            onChange={handleTitleChange}
          />
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
        <Form.Item
          label="Тип"
          name="type"
          rules={[{ required: true, message: validationMessages.required }]}
        >
          <Select options={mealTypeOptions}></Select>
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