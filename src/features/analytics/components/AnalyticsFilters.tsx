import React, { useState } from 'react';
import { DatePicker, Select, Form, Button, Card } from 'antd';
import { GroceryCategory, GroceryEventTypes } from '@agranom/boykom-common';
import { GroceryAnalyticsQuery } from '../models/analytics.interface';
import dayjs from 'dayjs';
import { groceryCategories } from '../../../translations/grocery.translations';
import { eSystemLanguages } from '../../../const/system-languages.enum';

const { RangePicker } = DatePicker;

interface AnalyticsFiltersProps {
    onFilterChange: (filters: GroceryAnalyticsQuery) => void;
    loading?: boolean;
}

const categoryTranslations = groceryCategories[eSystemLanguages.Ru]

const categoryOptions = Object.values(GroceryCategory).map(category => ({
    label: categoryTranslations[category],
    value: category,
}));

const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({ onFilterChange, loading }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values: any) => {
        const [startDate, endDate] = values.dateRange || [];

        if (!startDate || !endDate) {
            return;
        }

        onFilterChange({
            startDate: parseInt(startDate.format('YYYYMMDD')),
            endDate: parseInt(endDate.format('YYYYMMDD')),
            categories: values.categories,
        });
    };

    // Set default date range to last 7 days
    const defaultDateRange = [
        dayjs().subtract(1, 'month').startOf('month'),
        dayjs().subtract(1, 'month').endOf('month')
    ];
    const defaultCategories = [
        GroceryCategory.Fruits,
        GroceryCategory.Vegetables,
        GroceryCategory.Meat,
        GroceryCategory.Dairy,
        GroceryCategory.Bakery,
        GroceryCategory.Beverages,
        GroceryCategory.Snacks,
        GroceryCategory.Sweets,
        GroceryCategory.Spices,
        GroceryCategory.Oils,
        GroceryCategory.PantryStaples,
        GroceryCategory.Seafood,
        GroceryCategory.Greens,
        GroceryCategory.Fungi,
        GroceryCategory.Nuts,
        GroceryCategory.SemiProducts,
    ];

    return (
        <Card title="Фильтры" style={{ marginBottom: 16 }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    dateRange: defaultDateRange,
                    categories: defaultCategories,
                }}
            >
                <Form.Item
                    name="dateRange"
                    label="Дата"
                    rules={[{ required: true, message: 'Выберите дату' }]}
                >
                    <RangePicker style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="categories"
                    label="Категории"
                >
                    <Select
                        mode="multiple"
                        placeholder="Выберите категории"
                        options={categoryOptions}
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Применить фильтры
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default AnalyticsFilters;
