import { useChangeGroceryStatus } from './api/change-grocery-status';
import { useCreateGrocery } from './api/create-grocery';
import { useDeleteGrocery } from './api/delete-grocery';
import { useGroceries } from './api/get-groceries';
import { useUpdateGrocery } from './api/update-grocery';
import GroceriesList from './GroceriesList';
import styles from './Grocery.module.scss';
import GroceryForm from './GroceryForm';
import { eGroceryItemStatus, INewGroceryItem } from './models/grocery-item';

const Grocery = () => {
    const { data } = useGroceries();
    const { mutate: addGrocery } = useCreateGrocery();
    const { mutate: changeStatus } = useChangeGroceryStatus();
    const { mutate: updateGrocery } = useUpdateGrocery();
    const { mutate: deleteGrocery } = useDeleteGrocery();

    const addItemHandler = (item: INewGroceryItem) => {
        addGrocery({ ...item, status: eGroceryItemStatus.Undone });
    };
    return (
        <div className={styles.groceryWrapper}>
            <GroceryForm onSubmit={addItemHandler}/>
            <GroceriesList onItemDelete={deleteGrocery} onItemUpdate={updateGrocery} onItemStatusChange={changeStatus} data={data}/>
        </div>
    );
};

export default Grocery;
