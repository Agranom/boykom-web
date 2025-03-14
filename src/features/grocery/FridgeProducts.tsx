import LoaderLayout from '../../shared/LoaderLayout';
import { useGroceries } from './api/get-groceries';
import styles from './Grocery.module.scss';
import GroceryForm from './GroceryForm';
import { INewGroceryItem } from './models/grocery-item';
import { eSocketEvent, useSocketEvent } from '../../hooks/use-socket';
import GroceryCategory from './GroceryCategory';
import { groupBy } from 'lodash';
import { useEffect } from 'react';
import { useLoading } from '../../hooks/use-loading';
import NoData from '../../components/shared/NoData';
import { useCreateGrocery } from './api/create-grocery';

const FridgeProducts = () => {
  const { data, isLoading, refetch } = useGroceries(true);
  const { mutate: addGrocery, isLoading: isAddGroceryLoading } = useCreateGrocery();
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(isAddGroceryLoading);
  }, [isAddGroceryLoading]);

  useSocketEvent(eSocketEvent.GroceryChanged, () => refetch());

  const addItemHandler = (item: INewGroceryItem) => {
    addGrocery({ ...item, inFridge: true });
  };

  const groupedByCategory = groupBy(data, 'category');

  return (
    <div className={styles.groceryWrapper}>
      <GroceryForm onSubmit={addItemHandler} />
      <LoaderLayout isLoading={isLoading}>
        {!data || Object.keys(groupedByCategory).length === 0 ? (
          <NoData message="No items in fridge" />
        ) : (
          <GroceryCategory data={groupedByCategory} showPriority={false} />
        )}
      </LoaderLayout>
    </div>
  );
};

export default FridgeProducts; 