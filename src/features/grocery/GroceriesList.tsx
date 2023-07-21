import React from 'react';
import styles from './GroceriesList.module.scss';
import GroceryItem from './GroceryItem';
import { IGroceryItem, IGroceryItem as GroceryItemModel } from './models/grocery-item';
import {orderBy} from 'lodash'

type GroceriesListType = {
    data: GroceryItemModel[] | undefined;
    onItemUpdate: (item: IGroceryItem) => void;
    onItemDelete: (id: string) => void;
}

const GroceriesList: React.FC<GroceriesListType> = ({
                                                        data,
                                                        onItemUpdate,
                                                        onItemDelete,
                                                    }) => {
    return (
        <div className={styles.listGroup}>
            {orderBy(data, 'status', 'desc').map((i) => (
                <GroceryItem key={i.id} item={i}
                             onItemUpdate={onItemUpdate} onItemDelete={onItemDelete}/>))}
        </div>
    );
};

export default GroceriesList;
