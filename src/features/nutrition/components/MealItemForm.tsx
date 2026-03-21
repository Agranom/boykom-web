import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Form, InputNumber } from 'antd';
import { MinusCircleOutlined, BarcodeOutlined } from '@ant-design/icons';
import { FoodsAutocomplete } from './FoodsAutocomplete';
import { FoodAutocomplete } from '../models/nutrition.interface';
import { validationMessages } from '../../../translations/validation-messages.translations';
import AddUserDishModal from './AddUserDishModal';
import { UserDish } from '../models/user-dish.interface';
import { useGetDishNutrients } from '../api/get-dish-nutrients';
import { useGetFoodProductNutrients } from '../api/get-food-product-nutrients';
import MealItemNutrients from './MealItemNutrients';
import { BarcodeProduct } from './BarcodeProduct';

interface FoodItemFormProps {
  field: { name: number; key: number };
  remove: (index: number) => void;
  isFirstItem: boolean;
  enableCreateDish?: boolean;
}

const MealItemForm: React.FC<FoodItemFormProps> = ({ field, remove, isFirstItem, enableCreateDish = true }) => {
  const form = Form.useFormInstance();
  const formItemValue = Form.useWatch(['items', field.name], form);
  const portionSize = formItemValue?.portionSize;
  const isUserDish = formItemValue?.isUserDish;
  const [isAddDishModalOpen, setIsAddDishModalOpen] = useState<boolean>(false);
  const [isBarcodeScanerOpen, setIsBarcodeScanerOpen] = useState<boolean>(false);
  const portionInputRef = useRef<HTMLInputElement>(null);
  
  // Use appropriate API based on whether it's a user dish or food product
  const { data: dishNutrients } = useGetDishNutrients(
    isUserDish ? formItemValue?.key : undefined, 
    isUserDish ? portionSize : undefined
  );
  const { data: foodProductNutrients } = useGetFoodProductNutrients(
    !isUserDish ? formItemValue?.key : undefined, 
    !isUserDish ? portionSize : undefined
  );
  
  // Use the appropriate nutrients data
  const foodNutrients = isUserDish ? dishNutrients : foodProductNutrients;

  const handleSelectProduct = (product: FoodAutocomplete): void => {
    form.setFieldValue(['items', field.name, 'key'], product.key);
    form.setFieldValue(['items', field.name, 'value'], product.value);
    form.setFieldValue(['items', field.name, 'isUserDish'], product.isUserDish);
    
    // Focus and select the portion size input after product selection
    setTimeout(() => {
      if (portionInputRef.current) {
        portionInputRef.current.focus();
        portionInputRef.current.select();
      }
    }, 100);
  };
  const handleCreateDish = () => {
    setIsAddDishModalOpen(true);
  };
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
          enableCreateDish={enableCreateDish}
          onSelect={handleSelectProduct}
          onCreateDish={enableCreateDish ? handleCreateDish : undefined}
          value={formItemValue?.value}
        />
      </Form.Item>
      <Button className='w-full' onClick={handleScanBarcode}><BarcodeOutlined /> Поиск по штрихкоду</Button>
      <Form.Item
        label="Порция (г)"
        name={[field.name, 'portionSize']}
        rules={[{ required: true, message: validationMessages.required }]}
      >
        <InputNumber
          ref={portionInputRef}
          min={1}
          max={9999}
          placeholder="Введите вес в граммах"
          className="w-full"
          controls={false}
          keyboard={true}
          stringMode={false}
        />
      </Form.Item>
      {foodNutrients && <MealItemNutrients data={foodNutrients} portionSize={portionSize} />}
      {enableCreateDish && isAddDishModalOpen && <AddUserDishModal
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