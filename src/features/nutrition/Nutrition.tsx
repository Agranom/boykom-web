import React, { useMemo, useState } from 'react';
import { Button, Card, Dropdown, MenuProps, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AddMealModal } from './components/AddMealModal';
import { Meals } from './components/Meals';
import { NutritionDashboard } from './components/NutritionDashboard';
import { useCreateMeal } from './api/create-meal';
import { CreateMealPayload } from './models/nutrition.interface';
import { useAlert } from '../../hooks/use-alert';
import { MealType } from '@agranom/boykom-common';
import { mealTypeOptions } from './const/meal-type-options';
import { queryClient } from '../../config/react-query';
import { queryKeys } from '../../const/query-keys';

const { Title } = Typography;

const Nutrition: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<MealType | null>(null);
  const { showError, showSuccess } = useAlert();
  const { mutate: submitMeal, isLoading: isSubmitting } = useCreateMeal({
    onSuccess: () => {
      handleCloseModal();
      showSuccess('Приём пищи добавлен');
      queryClient.invalidateQueries({queryKey: [queryKeys.meals]});
      queryClient.invalidateQueries({queryKey: [queryKeys.nutritionSummary]});
    },
    onError: () => {
      showError('не удалось добавить приём пищи');
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
  const createMeal = (payload: CreateMealPayload): void => {
    submitMeal(payload);
  };

  return (
    <div>
      <Title level={3}>Питание</Title>
      <div style={{ marginBottom: 16 }}>
        <NutritionDashboard/>
      </div>
      <Meals/>
      <Dropdown
        menu={{ items: menuItems, onClick: handleMenuClick }}
        trigger={['click']}
        placement="topRight"
      >
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined/>}
          size="large"
          style={{ position: 'fixed', right: 24, bottom: 24 }}
        />
      </Dropdown>
      {isModalOpen && <AddMealModal
        selectedType={selectedType}
        isSubmitting={isSubmitting}
        onClose={handleCloseModal}
        onSubmit={createMeal}
      />}
    </div>
  );
};

export default Nutrition;
