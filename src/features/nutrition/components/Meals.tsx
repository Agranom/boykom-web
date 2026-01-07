import React from 'react';
import { List } from 'antd';
import { useGetMeals } from '../api/get-meals';
import { MealCard } from './MealCard';

export const Meals: React.FC = () => {
  const { data: meals, isLoading } = useGetMeals();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!meals || meals.length === 0) {
    return <div>Добавьте блюдо</div>;
  }

  return (
    <List
      dataSource={meals}
      renderItem={(meal) => (
        <List.Item>
          <MealCard meal={meal} />
        </List.Item>
      )}
    />
  );
};

