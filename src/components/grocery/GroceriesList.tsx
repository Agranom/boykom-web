import React from 'react';
import { IGroceryItem, IGroceryItem as GroceryItemModel } from '../../models/grocery-item';
import GroceryItem from './GroceryItem';
import styles from './GroceriesList.module.scss'

const GroceriesList: React.FC<{ data: GroceryItemModel[], onItemStatusChange: (item: Partial<IGroceryItem>) => void }> = ({
                                                                                                                              data,
                                                                                                                              onItemStatusChange,
                                                                                                                          }) => {
    return (
        <div className={styles.listGroup}>
            {data.map((i) => (
                <GroceryItem key={i.id} item={i} onItemChange={onItemStatusChange}/>))}
        </div>
    );
};

export default GroceriesList;
