import { Nutrients } from '@agranom/boykom-common';
import { Card, Space, Typography } from 'antd';

const { Text } = Typography;

interface MealItemNutrientsProps {
    portionSize: number
    data: Nutrients;
}

const MealItemNutrients: React.FC<MealItemNutrientsProps> = ({ data, portionSize }) => {
    return <Card size="small">
        <Space direction="vertical" size="small">
            <Text strong>Нутриенты для порции {portionSize}г</Text>
            <Space>
                <Text>кКал: {data.kcal ?? '—'}</Text>
                <Text>Белки: {data.prot ?? '—'}г</Text>
                <Text>Жиры: {data.fat ?? '—'}г</Text>
                <Text>Углеводы: {data.carbo ?? '—'}г</Text>
            </Space>
        </Space>
    </Card>;
};

export default MealItemNutrients;