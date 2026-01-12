import React from 'react';
import { Card, Dropdown, MenuProps, Tag, Typography } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { Meal } from '../models/nutrition.interface';
import { mealTypeOptions } from '../const/meal-type-options';
import dayjs from 'dayjs';
import { useDeleteMeal } from '../api/delete-meal';

const { Text } = Typography;

interface MealCardProps {
  meal: Meal;
}

export const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const { mutate: deleteMeal } = useDeleteMeal()
  const mealTypeLabel = mealTypeOptions.find((option) => option.value === meal.type)?.label || '';
  const formattedDatetime = dayjs(meal.eatenAt).format('DD.MM.YYYY HH:mm');
  const menuItems: MenuProps['items'] = [
    {
      key: 'edit',
      label: 'Edit',
    },
    {
      key: 'delete',
      label: 'Delete',
    },
  ];
  const handleMenuClick: MenuProps['onClick'] = (info): void => {
    if (info.key === 'edit') {
      // TODO: Implement edit functionality
    }
    if (info.key === 'delete') {
      deleteMeal(meal.id);
    }
  };

  return (
    <Card
      className='w-full'
      styles={{ body: { padding: '1rem' }, header: {padding: '0 1rem'} }}
      title={meal.title}
      extra={
        <Dropdown
          menu={{ items: menuItems, onClick: handleMenuClick }}
          trigger={['click']}
          placement="bottomRight"
        >
          <MoreOutlined style={{ cursor: 'pointer', fontSize: 18 }} />
        </Dropdown>
      }
    >
      <div className='flex gap-4 justify-between'>
        <div>
          <Tag>{mealTypeLabel}</Tag>
        </div>
        <Text type="secondary">{formattedDatetime}</Text>
      </div>
    </Card>
  );
};

