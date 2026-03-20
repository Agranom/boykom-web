import { FoodNutrient } from '../models/food-nutrient.interface';
import { Card, Space, Typography } from 'antd';
import { nutrientNumbers } from '@agranom/boykom-common';

const { Text } = Typography;

interface MealItemNutrientsProps {
    portionSize: number
    data: FoodNutrient[];
}

const MealItemNutrients: React.FC<MealItemNutrientsProps> = ({ data, portionSize }) => {
    const nutrients = data.reduce((acc, nutrient) => {
        acc[nutrient.nutrientNumber] = nutrient.amount;
        return acc;
    }, {} as Record<number, number>);
    return <Card size="small">
        <Space direction="vertical" size="small">
            <Text strong>Нутриенты для порции {portionSize}г</Text>
            <Space>
                <Text>кКал: {nutrients[nutrientNumbers.kcal] ?? '—'}</Text>
                <Text>Белки: {nutrients[nutrientNumbers.prot] ?? '—'}г</Text>
                <Text>Жиры: {nutrients[nutrientNumbers.fat] ?? '—'}г</Text>
                <Text>Углеводы: {nutrients[nutrientNumbers.carbo] ?? '—'}г</Text>
            </Space>
        </Space>
    </Card>;
};

export default MealItemNutrients;