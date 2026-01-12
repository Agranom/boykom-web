import React, { useEffect } from 'react';
import { Button, Card, Form, Radio, RadioChangeEvent, Slider, Space } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { FoodsAutocomplete } from './FoodsAutocomplete';
import { FoodAutocomplete } from '../models/nutrition.interface';
import { useGetNutrients } from '../api/get-nutrients';
import MealItemNutrients from './MealItemNutrients';
import { validationMessages } from '../../../translations/validation-messages.translations';

interface PortionOption {
  label: string;
  value: number;
}

const portionOptions: PortionOption[] = [
  { label: 'Маленькая (100г)', value: 100 },
  { label: 'Средняя (250г)', value: 250 },
  { label: 'Большая (350г)', value: 350 },
];

interface MealItemFormProps {
  field: { name: number; key: number };
  remove: (index: number) => void;
  isFirstItem: boolean;
}

export const MealItemForm: React.FC<MealItemFormProps> = ({ field, remove, isFirstItem }) => {
  const form = Form.useFormInstance();
  const formItemValue = Form.useWatch(['items', field.name], form);
  const [selectedOption, setSelectedOption] = React.useState<FoodAutocomplete | null>(null);
  const portionSize = formItemValue?.portionSize;
  const [sliderValue, setSliderValue] = React.useState<number>(portionSize);
  const productKey = formItemValue?.key;
  const { data: foodNutrients } = useGetNutrients(
    productKey,
    portionSize,
  );
  useEffect(() => {
    if (productKey && !selectedOption) {
      setSelectedOption({ key: productKey, value: formItemValue?.value || '', isUserDish: !!formItemValue?.isUserDish });
    }
  }, [productKey, formItemValue?.value, selectedOption, formItemValue?.isUserDish]);
  useEffect(() => {
    setSliderValue(portionSize);
  }, [portionSize]);

  const handleSelectProduct = (product: FoodAutocomplete): void => {
    setSelectedOption(product);
    form.setFieldValue(['items', field.name, 'key'], product.key);
    form.setFieldValue(['items', field.name, 'value'], product.value);
    form.setFieldValue(['items', field.name, 'isUserDish'], product.isUserDish);
  };
  const handlePortionChange = (event: RadioChangeEvent): void => {
    const value = event.target.value;
    form.setFieldValue(['items', field.name, 'portionSize'], value);
  };
  const handleSliderChange = (value: number): void => {
    setSliderValue(value);
  };
  const handleSliderComplete = (value: number): void => {
    form.setFieldValue(['items', field.name, 'portionSize'], value);
  };

  return (
    <Card
      size="small"
      style={{ marginBottom: 16 }}
      title={`Продукт №${field.name + 1}`}
      extra={
        !isFirstItem && (
          <Button
            type="text"
            danger
            icon={<MinusCircleOutlined/>}
            onClick={() => remove(field.name)}
          >
            Удалить
          </Button>
        )
      }
    >
      <Form.Item
        name={[field.name, 'key']}
        hidden
      >
        <input type="hidden"/>
      </Form.Item>
      <Form.Item
        label="Название"
        name={[field.name, 'value']}
        rules={[{ required: true, message: validationMessages.required }]}
      >
        <FoodsAutocomplete onSelect={handleSelectProduct}/>
      </Form.Item>
      <Form.Item
        label="Порция"
        name={[field.name, 'portionSize']}
        rules={[{ required: true, message: validationMessages.required }]}
      >
        <Radio.Group onChange={handlePortionChange}>
          <Space>
            {portionOptions.map((option) => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>

      </Form.Item>
      <Slider
        min={1}
        max={1000}
        value={sliderValue}
        onChange={handleSliderChange}
        onChangeComplete={handleSliderComplete}
        marks={{
          1: '1г',
          100: '100г',
          250: '250г',
          500: '500г',
          750: '750г',
          1000: '1000г',
        }}
      />
      {foodNutrients && <MealItemNutrients portionSize={portionSize} data={foodNutrients.nutrients}/>}
    </Card>
  );
};

