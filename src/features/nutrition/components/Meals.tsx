import React, { useMemo } from 'react';
import { List, Typography } from 'antd';
import { Dayjs } from 'dayjs';
import { useGetMeals } from '../api/get-meals';
import { MealCard } from './MealCard';
import { dateFormat } from '../const/date-format';

interface MealsProps {
  startDate: Dayjs;
  endDate: Dayjs;
}

const { Title } = Typography;

export const Meals: React.FC<MealsProps> = ({ startDate, endDate }) => {
  const { data: meals, isLoading } = useGetMeals({ 
    page: 1, 
    limit: 10,
    from: startDate.toDate(),
    to: endDate.toDate(),
  });
  const selectedDateRange = useMemo(() => endDate.diff(startDate, 'days') > 0 ?
  `${startDate.format(dateFormat)} - ${endDate.format(dateFormat)}` : startDate.format(dateFormat), [startDate, endDate]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!meals || meals.length === 0) {
    return <div>Добавьте блюдо</div>;
  }


  return (
    <div>
    <Title level={3}>Приёмы пищи за {selectedDateRange}</Title>
    <List
      dataSource={meals}
      renderItem={(meal) => (
        <List.Item>
          <MealCard meal={meal}/>
        </List.Item>
      )}
    />
  </div>);
};

