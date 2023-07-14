import { Card, CardContent, Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { GroceryItemStatuses, IGroceryItem } from '../../models/grocery-item';
import styles from './GroceryItem.module.scss';

const GroceryItem: React.FC<{ item: IGroceryItem, onItemChange: (item: Partial<IGroceryItem>) => void }> = ({
                                                                                                                item,
                                                                                                                onItemChange,
                                                                                                            }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const status = event.target.checked ? GroceryItemStatuses.Done : GroceryItemStatuses.Undone;
        onItemChange({ status, id: item.id });
    };

    return (
        <Card
            className={styles.groceryItem + ' ' + (item.status === GroceryItemStatuses.Done ? styles.groceryItemDone : '')}>
            <CardContent>
                <FormControlLabel disableTypography className={styles.groceryItemControl}
                                  control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                                                     onChange={handleChange}/>}
                                  label={item.name}/>
            </CardContent>
        </Card>
    );
};

export default GroceryItem;
