import { useState } from 'react';
import { GroceryItemStatuses, GroceryTypes, IGroceryItem } from '../../models/grocery-item';
import GroceriesList from './GroceriesList';

const defaultData: IGroceryItem[] = [
    { id: '1', name: 'Яблоко', type: GroceryTypes.Fruit, status: GroceryItemStatuses.Undone },
    { id: '2', name: 'Абрикос', type: GroceryTypes.Fruit, status: GroceryItemStatuses.Undone },
    { id: '3', name: 'Помидор', type: GroceryTypes.Vegetable, status: GroceryItemStatuses.Undone },
];

const Grocery = () => {
    const [data, setData] = useState(defaultData);
    const itemStatusHandler = (item: Partial<IGroceryItem>) => {
        setData((prevData) => {
            prevData.forEach(i => {
                if (i.id === item.id) {
                    i.status = item.status as GroceryItemStatuses;
                }
            })
            return prevData.slice();
        })
    };
    return (
        <div>
            <GroceriesList onItemStatusChange={itemStatusHandler} data={data}/>
        </div>
    )
}

export default Grocery;
