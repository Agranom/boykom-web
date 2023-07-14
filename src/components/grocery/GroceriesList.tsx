import { uniqBy } from 'lodash';
import React from 'react';
import { IGroceryItem, IGroceryItem as GroceryItemModel } from '../../models/grocery-item';
import { GroceryTypesTranslator } from '../../utils/grocery-types-translator';
import GroceryItem from './GroceryItem';
import styles from './GroceriesList.module.scss';

const GroceriesList: React.FC<{ data: GroceryItemModel[], onItemStatusChange: (item: Partial<IGroceryItem>) => void }> = ({ data, onItemStatusChange }) => {
    const types = uniqBy(data, 'type').map(d => d.type);
    return (
        <div>
            {types.map((t) => (
            <div key={t} className={styles.listGroup}>
                <div className={styles.listGroupLabel}>
                    <span>{GroceryTypesTranslator.toCategoryType(t)}</span>
                </div>
                {data.filter(i => i.type === t).map((i) => (<GroceryItem key={i.id} item={i} onItemChange={onItemStatusChange}/>))}
            </div>
            ))}
        </div>
    );
};

export default GroceriesList;
