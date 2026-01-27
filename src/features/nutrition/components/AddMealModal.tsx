import React, { useEffect, useState } from 'react';
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { CreateMealItemPayload, Meal } from '../models/meal.interface';
import { MealItemSourceType, MealType } from '@agranom/boykom-common';
import { mealTypeOptions } from '../const/meal-type-options';
import { validationMessages } from '../../../translations/validation-messages.translations';
import MenuItemForm from './MenuItemForm';
import { useAlert } from '../../../hooks/use-alert';
import { useCreateMeal } from '../api/create-meal';
import { MealTemplates } from './MealTemplates';
import { useGetMealById } from '../api/get-meal';

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
  isTemplate: boolean;
}


const DEFAULT_PORTION_SIZE = 250;

interface AddMealModalProps {
  onClose: () => void;
  selectedType?: MealType;
  currentMeal?: Meal;
  isFirstCreate?: boolean;
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
                                                            currentMeal,
                                                            isFirstCreate = false,
                                                          }) => {
  const [form] = Form.useForm<MealFormValues>();
  const [isTitleManuallyEdited, setIsTitleManuallyEdited] = useState(false);
  const [mealTemplateId, setMealTemplateId] = useState<string>();
  const [meal, setMeal] = useState<Meal | undefined>(currentMeal);
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
  const { data: mealData, isFetching: isMealLoading } = useGetMealById(mealTemplateId);

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
          isTemplate: false,
        }
        : {
          datetime: defaultDatetime,
          title: defaultTitle,
          type: selectedType,
          items: [{ key: '', value: '', portionSize: DEFAULT_PORTION_SIZE }],
          isTemplate: false,
        });
    setIsTitleManuallyEdited(false); // Reset when selectedType changes
  }, [selectedType, meal]);

  useEffect(() => {
    if (mealData) {
      setMeal(mealData);
    }
  }, [mealData]);


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
    const { items, datetime, title, type, isTemplate } = form.getFieldsValue();
    if (!items || items.length === 0) {
      return;
    }
    const mealItems: CreateMealItemPayload[] = items.map(item => ({
      sourceKey: item.key,
      sourceType: item.isUserDish ? MealItemSourceType.UserDish : MealItemSourceType.FoodProduct,
      name: item.value,
      grams: Number(item.portionSize),
    }));

    submitMeal({
      title,
      type,
      eatenAt: datetime.toDate(),
      items: mealItems,
      isTemplate,
    });
  };
  const handleClose = (): void => {
    form.resetFields();
    onClose();
  };
  const handleSelectTemplate = (templateId: string) => {
    setMealTemplateId(templateId);
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
        disabled={isMealLoading || isSubmitting}
      >
        {isFirstCreate && <div className="my-6">
          <MealTemplates onSelect={handleSelectTemplate}/>
        </div>}
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
        <Form.Item
          name="isTemplate"
          valuePropName="checked"
        >
          <Checkbox>Сохранить как шаблон</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};