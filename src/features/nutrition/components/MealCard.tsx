import React, { useState } from 'react';
import { Card, Collapse, Dropdown, MenuProps, Tag, Typography } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { Meal } from '../models/nutrition.interface';
import { mealTypeOptions } from '../const/meal-type-options';
import dayjs from 'dayjs';
import { useDeleteMeal } from '../api/delete-meal';
import { AddMealModal } from './AddMealModal';

const { Text } = Typography;

enum MenuActions {
  Edit = 'edit',
  Delete = 'delete',
  Repeate = 'repeate',
}

interface MealCardProps {
  meal: Meal;
}

const menuItems: MenuProps['items'] = [
  {
    key: MenuActions.Repeate,
    label: 'Повторить',
  },
  {
    key: MenuActions.Delete,
    label: 'Удалить',
  },
];

export const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const { mutate: deleteMeal } = useDeleteMeal()
  const [isAddMealModalOpen, setIsAddMealModalOpen] = useState<boolean>(false);
  const mealTypeLabel = mealTypeOptions.find((option) => option.value === meal.type)?.label || '';
  const formattedDatetime = dayjs(meal.eatenAt).format('DD.MM.YYYY HH:mm');

  const handleMenuClick: MenuProps['onClick'] = (info): void => {
    if (info.key === MenuActions.Edit) {
      // TODO: Implement edit functionality
    }
    if (info.key === MenuActions.Delete) {
      deleteMeal(meal.id);
    }
    if (info.key === MenuActions.Repeate) {
      setIsAddMealModalOpen(true);
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
      
      {meal.items && meal.items.length > 0 && (
        <div className='mt-3'>
          <Collapse
            size="small"
            items={[
              {
                key: '1',
                label: `Продукты (${meal.items.length})`,
                children: (
                  <ul className="list-disc pl-5">
                    {meal.items.map((item, index) => (
                      <li key={index} className="mb-1">
                        {item.name}
                      </li>
                    ))}
                  </ul>
                ),
              },
            ]}
          />
        </div>
      )}
      {isAddMealModalOpen && <AddMealModal meal={meal} onClose={() => setIsAddMealModalOpen(false)} />}
    </Card>
  );
};

