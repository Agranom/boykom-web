import React, { useMemo, useState } from 'react';
import { Button, Dropdown, MenuProps, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AddMealModal } from './components/AddMealModal';
import { Meals } from './components/Meals';
import { NutritionDashboard } from './components/NutritionDashboard';
import { MealType } from '@agranom/boykom-common';
import { mealTypeOptions } from './const/meal-type-options';

const { Title } = Typography;

const Nutrition: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<MealType | undefined>();

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
    setSelectedType(undefined);
  };

  return (
    <div>
      <Title level={2}>Питание</Title>
      <div style={{ marginBottom: 16 }}>
        <NutritionDashboard/>
      </div>
      <Title level={3}>Предыдущие приёмы пищи</Title>
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
        onClose={handleCloseModal}
        isFirstCreate={true}
      />}
    </div>
  );
};

export default Nutrition;
