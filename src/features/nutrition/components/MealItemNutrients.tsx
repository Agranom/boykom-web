import { Nutrients } from '@agranom/boykom-common';
import { Card, Space, Spin, Typography } from 'antd';

const { Text } = Typography;

interface MealItemNutrientsProps {
    isLoading: boolean;
    portionSize: number
    data?: Nutrients;
}

const MealItemNutrients: React.FC<MealItemNutrientsProps> = ({ data, isLoading, portionSize }) => {
    return <Card size="small">

        {isLoading && <Space>
            <Spin size="small" />
            <Text>Calculating nutrients...</Text>
        </Space>}

        {data && !isLoading && <Space direction="vertical" size="small">
            <Text strong>Nutrients for {portionSize}g</Text>
            <Space split="•">
                <Text>Kcal: {data.kcal ?? '—'}</Text>
                <Text>Protein: {data.prot ?? '—'}g</Text>
                <Text>Carbs: {data.carbo ?? '—'}g</Text>
                <Text>Fat: {data.fat ?? '—'}g</Text>
            </Space>
        </Space>}
    </Card>;
};

export default MealItemNutrients;