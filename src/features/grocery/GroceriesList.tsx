import React from 'react';
import styles from './GroceriesList.module.scss';
import GroceryItem from './GroceryItem';
import { IGroceryItem as GroceryItemModel } from './models/grocery-item';
import { orderBy } from 'lodash';
import { useUpdateGrocery } from './api/update-grocery';
import { useDeleteGrocery } from './api/delete-grocery';

type GroceriesListType = {
  data: GroceryItemModel[];
  showPriority?: boolean;
}

const GroceriesList: React.FC<GroceriesListType> = ({ data, showPriority = true }) => {
  const { mutate: updateGrocery } = useUpdateGrocery();
  const { mutate: deleteGrocery } = useDeleteGrocery();

  return (
    <div className={styles.listGroup}>
      {orderBy(data, 'status', 'desc').map((i) => (
        <GroceryItem 
          key={i.id} 
          item={i}
          showPriority={showPriority}
          onItemUpdate={updateGrocery} 
          onItemDelete={deleteGrocery}
        />
      ))}
    </div>
  );
};

export default GroceriesList;
