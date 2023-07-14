import { useState } from 'react';
import { eGroceryItemPriority, eGroceryItemStatus, eGroceryType, IGroceryItem } from '../../models/grocery-item';
import GroceriesList from './GroceriesList';

const defaultData: IGroceryItem[] = [
    {
        id: '1',
        name: 'Яблоко',
        type: eGroceryType.Fruit,
        status: eGroceryItemStatus.Undone,
        priority: eGroceryItemPriority.Major,
    },
    {
        id: '2',
        name: 'Абрикос',
        type: eGroceryType.Fruit,
        status: eGroceryItemStatus.Undone,
        priority: eGroceryItemPriority.Medium,
    },
    {
        id: '3',
        name: 'Помидор',
        type: eGroceryType.Vegetable,
        status: eGroceryItemStatus.Undone,
        priority: eGroceryItemPriority.Low,
    },
];

const Grocery = () => {
    const [data, setData] = useState(defaultData);
    const itemStatusHandler = (item: Partial<IGroceryItem>) => {
        setData((prevData) => {
            prevData.forEach(i => {
                if (i.id === item.id) {
                    i.status = item.status as eGroceryItemStatus;
                }
            });
            return prevData.slice();
        });
    };
    return (
        <div>
            <GroceriesList onItemStatusChange={itemStatusHandler} data={data}/>
        </div>
    );
};

export default Grocery;
