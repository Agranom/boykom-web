import React from 'react';
import { Card, Empty, Spin, Statistic, Row, Col } from 'antd';
import { Pie } from '@ant-design/plots';
import { GroceryAnalytics } from '../models/analytics.interface';

interface AnalyticsChartProps {
    data: GroceryAnalytics[];
    loading: boolean;
    title: string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data, loading, title }) => {
    // Transform data for Ant Design PieChart
    const pieData = data.map(item => ({
        type: item.name,
        value: item.count,
        // category: item.category, TODO: Add category
    }));

    // Calculate total count for statistics
    const totalCount = data.reduce((sum, item) => sum + item.count, 0);
    const topItem = data.length > 0 ? data.reduce((max, item) => max.count > item.count ? max : item) : null;

    return (
        <Card title={title}>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                    <Spin size="large" />
                </div>
            ) : data.length > 0 ? (
                <>
                    <Row gutter={16} style={{ marginBottom: 16 }}>
                        <Col span={12}>
                            <Statistic title="Общее количество" value={totalCount} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="Самый популярный продукт" value={topItem?.name || 'None'} suffix={topItem ? `(${topItem.count})` : ''} />
                        </Col>
                    </Row>
                    <Pie 
                        data={pieData}
                        angleField="value"
                        colorField="type"
                        radius={0.8}
                        // Simplest approach - no labels but good tooltips
                        label={[
                            {
                                text: 'type',
                                style: {
                                  fontWeight: 'bold',
                                },
                                position: 'outside',
                              },
                              {
                                text: (datum: any) => {
                                  const percent = (datum.value / totalCount * 100).toFixed(1);
                                  return `${percent}%`;
                                },
                                style: {
                                  fontWeight: 'bold',
                                },
                              }
                        ]}
                        interactions={[{ type: 'element-active' }]}
                        height={400}
                        tooltip={{
                              items: [ // Define what items appear in the tooltip
                                { field: 'type', name: 'Продукт' },
                                { field: 'value', name: 'Количество', valueFormatter: (value: number, item: any) => {
                                    return `${value} (${(value / totalCount * 100).toFixed(1)}%)`;
                                } },
                              ],
                          }}
                    />
                </>
            ) : (
                <Empty description="No data available" />
            )}
        </Card>
    );
};

export default AnalyticsChart;
