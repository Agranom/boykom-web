import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Radio, Space } from 'antd';
import { MinusCircleOutlined, BarcodeOutlined } from '@ant-design/icons';
import { FoodsAutocomplete } from './FoodsAutocomplete';
import { FoodAutocomplete } from '../models/nutrition.interface';
import { validationMessages } from '../../../translations/validation-messages.translations';
import AddUserDishModal from './AddUserDishModal';
import { UserDish } from '../models/user-dish.interface';
import { portionOptions } from '../const/portion-options';
import { PortionSizeSlider } from './PortionSizeSlider';
import { useGetNutrients } from '../api/get-nutrients';
import MealItemNutrients from './MealItemNutrients';
import { BarcodeProduct } from './BarcodeProduct';

interface FoodItemFormProps {
  field: { name: number; key: number };
  remove: (index: number) => void;
  isFirstItem: boolean;
}

const MealItemForm: React.FC<FoodItemFormProps> = ({ field, remove, isFirstItem }) => {
  const form = Form.useFormInstance();
  const formItemValue = Form.useWatch(['items', field.name], form);
  const [selectedOption, setSelectedOption] = React.useState<FoodAutocomplete | null>(null);
  const portionSize = formItemValue?.portionSize;
  const [sliderValue, setSliderValue] = React.useState<number>(portionSize);
  const [isAddDishModalOpen, setIsAddDishModalOpen] = useState<boolean>(false);
  const [isBarcodeScanerOpen, setIsBarcodeScanerOpen] = useState<boolean>(false);
  const { data: foodNutrients } = useGetNutrients(selectedOption?.key, portionSize);

  useEffect(() => {
    if (!sliderValue) {
      setSliderValue(portionSize);
    }
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
  const handleScanBarcode = () => {
    setIsBarcodeScanerOpen(true);
  };
  const handleCloseBarcodeScaner = () => {
    setIsBarcodeScanerOpen(false);
  };
  const handleBarcodeDetected = (product: { barcode: string; productName: string }) => {
    if (product) {
      handleSelectProduct({ key: product.barcode, value: product.productName, isUserDish: false });
    }
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
      <Button className='w-full' onClick={handleScanBarcode}><BarcodeOutlined /> Поиск по штрихкоду</Button>
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
        onChangeComplete={handleSliderComplete}
      />
      {foodNutrients && <MealItemNutrients data={foodNutrients.nutrients} portionSize={portionSize} />}
      {isAddDishModalOpen && <AddUserDishModal
        onCreateSuccess={handleDishCreateSuccess}
        onClose={handleCloseDishModal} />}
      {isBarcodeScanerOpen && <BarcodeProduct
        onClose={handleCloseBarcodeScaner}
        onBarcodeDetected={handleBarcodeDetected}
      />}
    </Card>
  );
};

export default MealItemForm;