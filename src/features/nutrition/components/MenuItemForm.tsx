import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Radio, Space } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { FoodsAutocomplete } from './FoodsAutocomplete';
import { FoodAutocomplete } from '../models/nutrition.interface';
import { validationMessages } from '../../../translations/validation-messages.translations';
import AddUserDishModal from './AddUserDishModal';
import { UserDish } from '../models/user-dish.interface';
import { portionOptions } from '../const/portion-options';
import { PortionSizeSlider } from './PortionSizeSlider';
import { useGetNutrients } from '../api/get-nutrients';
import MealItemNutrients from './MealItemNutrients';

interface FoodItemFormProps {
  field: { name: number; key: number };
  remove: (index: number) => void;
  isFirstItem: boolean;
}

const MenuItemForm: React.FC<FoodItemFormProps> = ({ field, remove, isFirstItem }) => {
  const form = Form.useFormInstance();
  const formItemValue = Form.useWatch(['items', field.name], form);
  const [selectedOption, setSelectedOption] = React.useState<FoodAutocomplete | null>(null);
  const portionSize = formItemValue?.portionSize;
  const [sliderValue, setSliderValue] = React.useState<number>(portionSize);
  const [isAddDishModalOpen, setIsAddDishModalOpen] = useState<boolean>(false);
  const { data: foodNutrients } = useGetNutrients(selectedOption?.key, portionSize);

  useEffect(() => {
    setSliderValue(portionSize);
  }, [portionSize]);

  const handleSelectProduct = (product: FoodAutocomplete): void => {
    setSelectedOption(product);
    form.setFieldValue(['items', field.name, 'key'], product.key);
    form.setFieldValue(['items', field.name, 'value'], product.value);
    form.setFieldValue(['items', field.name, 'isUserDish'], product.isUserDish);
  };
  const handleSliderChange = (value: number): void => {
    setSliderValue(value);
  };
  const handleSliderComplete = (value: number): void => {
    form.setFieldValue(['items', field.name, 'portionSize'], value);
  };
  const handleCreateDish = () => {
    setIsAddDishModalOpen(true);
  }
  const handleCloseDishModal = () => {
    setIsAddDishModalOpen(false);
  };
  const handleDishCreateSuccess = (dish: UserDish | null) => {
    if (dish) {
      handleSelectProduct({ key: dish.id, value: dish.name, isUserDish: true });
    }
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
            icon={<MinusCircleOutlined />}
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
        <input type="hidden" />
      </Form.Item>
      <Form.Item
        label="Название"
        name={[field.name, 'value']}
        rules={[{ required: true, message: validationMessages.required }]}
      >
        <FoodsAutocomplete
          enableCreateDish={true}
          onSelect={handleSelectProduct}
          onCreateDish={handleCreateDish}
          value={selectedOption?.value}
        />
      </Form.Item>
      <Form.Item
        label="Порция"
        name={[field.name, 'portionSize']}
        rules={[{ required: true, message: validationMessages.required }]}
      >
        <Radio.Group>
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
        onChangeComplete={handleSliderComplete}
      />
      {foodNutrients && <MealItemNutrients data={foodNutrients.nutrients} portionSize={portionSize} />}
      {isAddDishModalOpen && <AddUserDishModal
        onCreateSuccess={handleDishCreateSuccess}
        onClose={handleCloseDishModal} />}
    </Card>
  );
};

export default MenuItemForm;