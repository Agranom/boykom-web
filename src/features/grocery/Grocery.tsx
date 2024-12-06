import LoaderLayout from '../../shared/LoaderLayout';
import { useCreateGrocery } from './api/create-grocery';
import { useDeleteGrocery } from './api/delete-grocery';
import { useGroceries } from './api/get-groceries';
import { useUpdateGrocery } from './api/update-grocery';
import GroceriesList from './GroceriesList';
import styles from './Grocery.module.scss';
import GroceryForm from './GroceryForm';
import { eGroceryItemStatus, INewGroceryItem } from './models/grocery-item';
import { eSocketEvent, useSocketEvent } from '../../hooks/use-socket';

const Grocery = () => {
  const { data, isLoading, refetch } = useGroceries();
  const { mutate: addGrocery } = useCreateGrocery();
  const { mutate: updateGrocery } = useUpdateGrocery();
  const { mutate: deleteGrocery } = useDeleteGrocery();

  useSocketEvent(eSocketEvent.GroceryChanged, () => refetch());

  const addItemHandler = (item: INewGroceryItem) => {
    addGrocery({ ...item, status: eGroceryItemStatus.Undone });
  };
  return (
    <div className={styles.groceryWrapper}>
      <GroceryForm onSubmit={addItemHandler}/>
      <LoaderLayout isLoading={isLoading}>
        <GroceriesList onItemDelete={deleteGrocery} onItemUpdate={updateGrocery} data={data}/>
      </LoaderLayout>
    </div>
  );
};

export default Grocery;
