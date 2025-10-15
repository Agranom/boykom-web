import React, { useState } from 'react';
import { Container } from '@mui/material';
import AnalyticsFilters from './components/AnalyticsFilters';
import AnalyticsChart from './components/AnalyticsChart';
import { GroceryAnalyticsQuery } from './models/analytics.interface';
import { useGroceryAnalytics } from './api/get-analytics';
import dayjs from 'dayjs';
import { GroceryCategory } from '@agranom/boykom-common';

const defaultDateRange = [
    dayjs().subtract(1, 'month').startOf('month').format('YYYYMMDD'),
    dayjs().subtract(1, 'month').endOf('month').format('YYYYMMDD')
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

const Analytics: React.FC = () => {
    const [filters, setFilters] = useState<GroceryAnalyticsQuery>({
        startDate: parseInt(defaultDateRange[0]),
        endDate: parseInt(defaultDateRange[1]),
        categories: defaultCategories,
    });

    const { data: analyticsData, isLoading } = useGroceryAnalytics(filters);

    const handleFilterChange = (newFilters: GroceryAnalyticsQuery) => {
        setFilters(newFilters);
    };

    return (
        <Container maxWidth="md" style={{ paddingTop: 16, paddingBottom: 72 }}>
            <AnalyticsFilters 
                onFilterChange={handleFilterChange} 
                loading={isLoading}
            />
            <AnalyticsChart 
                title="Семейные закупки"
                data={analyticsData || []} 
                loading={isLoading} 
            />
        </Container>
    );
};

export default Analytics;
