import LoaderLayout from '../../shared/LoaderLayout';
import { useCreateGrocery } from './api/create-grocery';
import { useGroceries } from './api/get-groceries';
import styles from './Grocery.module.scss';
import GroceryForm from './GroceryForm';
import { INewGroceryItem } from './models/grocery-item';
import { eSocketEvent, useSocketEvent } from '../../hooks/use-socket';
import GroceryCategory from './GroceryCategory';
import { groupBy } from 'lodash';
import { useEffect } from 'react';
import { useLoading } from '../../hooks/use-loading';

const Grocery = () => {
  const { data, isLoading, refetch, isRefetching } = useGroceries();
  const { mutate: addGrocery, isLoading: isAddGroceryLoading } = useCreateGrocery();
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(isAddGroceryLoading || isRefetching);

  }, [isAddGroceryLoading, isRefetching]);

  useSocketEvent(eSocketEvent.GroceryChanged, () => refetch());

  const addItemHandler = (item: INewGroceryItem) => {
    addGrocery(item);
  };
  const groupedByCategory = groupBy(data, 'category');

  return (
    <div className={styles.groceryWrapper}>
      <GroceryForm onSubmit={addItemHandler}/>
      <LoaderLayout isLoading={isLoading}>
        <GroceryCategory data={groupedByCategory}/>
      </LoaderLayout>
    </div>
  );
};

export default Grocery;
