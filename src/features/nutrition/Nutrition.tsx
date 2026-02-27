import React, { useMemo, useState } from 'react';
import { Button, Dropdown, MenuProps, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { AddMealModal } from './components/AddMealModal';
import { Meals } from './components/Meals';
import { NutritionDashboard } from './components/NutritionDashboard';
import { NutritionFilters } from './components/NutritionFilters';
import { MealType } from '@agranom/boykom-common';
import { mealTypeOptions } from './const/meal-type-options';

const { Title } = Typography;

const Nutrition: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<MealType | undefined>();
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([dayjs().startOf('day'), dayjs().endOf('day')]);

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

  const handleDateRangeChange = (newDateRange: [Dayjs, Dayjs]): void => {
    setDateRange(newDateRange);
  };

  return (
    <div>
      <Title level={2}>Питание</Title>
      <div style={{ marginBottom: 16 }}>
        <NutritionFilters
          onDateRangeChange={handleDateRangeChange}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <NutritionDashboard
          startDate={dateRange[0]}
          endDate={dateRange[1]}
        />
      </div>
      <Meals
        startDate={dateRange[0]}
        endDate={dateRange[1]}
      />
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
          style={{ position: 'fixed', right: 24, bottom: 74 }}
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
