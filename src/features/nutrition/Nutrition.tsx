import React, { useMemo, useState } from 'react';
import { Button, Card, Dropdown, MenuProps, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AddNutritionEntryModal } from './components/AddNutritionEntryModal';
import { useCreateMeal } from './api/create-meal';
import { CreateMealPayload } from './models/nutrition.interface';
import { useAlert } from '../../hooks/use-alert';
import { MealType } from '@agranom/boykom-common';
import { mealTypeOptions } from './const/meal-type-options';

const { Title, Text } = Typography;

const Nutrition: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<MealType | null>(null);
  const { showError, showSuccess } = useAlert();
  const { mutate: submitMeal, isLoading: isSubmitting } = useCreateMeal({
    onSuccess: () => {
      showSuccess('Meal saved successfully');
      handleCloseModal();
    },
    onError: () => {
      showError('Failed to save meal');
    },
  });
  const menuItems = useMemo<MenuProps['items']>(() => {
    return mealTypeOptions.map((option) => ({
      key: option.value.toString(),
      label: option.label,
    }));
  }, []);
  const handleMenuClick: MenuProps['onClick'] = (info): void => {
    setSelectedType(Number(info.key));
    setIsModalOpen(true);
  };
  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedType(null);
  };
  const handleSubmit = (payload: CreateMealPayload): void => {
    submitMeal(payload);
  };

  return (
    <div>
      <Card>
        <Space direction="vertical" size="small">
          <Title level={3}>Nutrition</Title>
          <Text type="secondary">Add your meals to track nutrients.</Text>
        </Space>
      </Card>
      <Dropdown
        menu={{ items: menuItems, onClick: handleMenuClick }}
        trigger={['click']}
        placement="topRight"
      >
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="large"
          style={{ position: 'fixed', right: 24, bottom: 24 }}
        />
      </Dropdown>
      {isModalOpen && <AddNutritionEntryModal
        selectedType={selectedType}
        isSubmitting={isSubmitting}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />}
    </div>
  );
};

export default Nutrition;
