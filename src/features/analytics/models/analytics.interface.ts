import { GroceryCategory } from '@agranom/boykom-common';

export interface GroceryAnalytics {
    name: string;
    count: number;
}

export interface GroceryAnalyticsQuery {
    startDate: number;
    endDate: number;
    categories?: GroceryCategory[];
}
