import React from 'react';
import styles from './GroceriesList.module.scss';
import GroceryItem from './GroceryItem';
import { IGroceryItem, IGroceryItem as GroceryItemModel } from './models/grocery-item';

type GroceriesListType = {
    data: GroceryItemModel[] | undefined;
    onItemStatusChange: (item: Partial<IGroceryItem>) => void;
    onItemUpdate: (item: IGroceryItem) => void;
    onItemDelete: (id: string) => void;
}

const GroceriesList: React.FC<GroceriesListType> = ({
                                                        data,
                                                        onItemStatusChange,
                                                        onItemUpdate,
                                                        onItemDelete,
                                                    }) => {
    return (
        <div className={styles.listGroup}>
            {data?.map((i) => (
                <GroceryItem key={i.id} item={i} onItemStatusChange={onItemStatusChange}
                             onItemUpdate={onItemUpdate} onItemDelete={onItemDelete}/>))}
        </div>
    );
};

export default GroceriesList;
