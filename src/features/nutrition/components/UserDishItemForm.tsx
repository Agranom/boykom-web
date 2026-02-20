import { Button, Card, Form, Radio, Space } from 'antd';
import React from 'react';
import { FoodAutocomplete } from '../models/nutrition.interface';
import { MinusCircleOutlined } from '@ant-design/icons';
import { validationMessages } from '../../../translations/validation-messages.translations';
import { FoodsAutocomplete } from './FoodsAutocomplete';
import { portionOptions } from '../const/portion-options';
import { PortionSizeSlider } from './PortionSizeSlider';

interface UserDishItemProps {
  field: { name: number; key: number };
  remove: (index: number) => void;
  isFirstItem: boolean;
  enableCreateDish?: boolean;
}

export const UserDishItemForm: React.FC<UserDishItemProps> = ({field, isFirstItem, remove}) => {
  const form = Form.useFormInstance();
  const formItemValue = Form.useWatch(['items', field.name], form);
  const portionSize = formItemValue?.portionSize;
  const [sliderValue, setSliderValue] = React.useState<number>(portionSize);

  const handleSelectProduct = (product: FoodAutocomplete): void => {
    form.setFieldValue(['items', field.name, 'key'], product.key);
    form.setFieldValue(['items', field.name, 'value'], product.value);
  };
  const handleSliderChange = (value: number): void => {
    setSliderValue(value);
  };
  const handleSliderComplete = (value: number): void => {
    form.setFieldValue(['items', field.name, 'portionSize'], value);
  };
  const handlePortionSizeChange = (value: number) => {
    setSliderValue(value);
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
        <FoodsAutocomplete
          enableCreateDish={false}
          onSelect={handleSelectProduct}
        />
      </Form.Item>
      <Form.Item
        label="Порция"
        name={[field.name, 'portionSize']}
        rules={[{ required: true, message: validationMessages.required }]}
      >
        <Radio.Group onChange={(e) => handlePortionSizeChange(e.target.value)}>
          <Space>
            {portionOptions.map((option) => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>

      </Form.Item>
      <PortionSizeSlider
        value={sliderValue}
        onChange={handleSliderChange}
        onChangeComplete={handleSliderComplete} />
    </Card>
  );
}