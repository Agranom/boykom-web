import { Delete, Edit, MoreVert } from '@mui/icons-material';
import {
    Card,
    CardContent,
    Checkbox,
    Chip,
    FormControlLabel,
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
} from '@mui/material';
import React, { useRef } from 'react';
import { eGroceryItemPriority, eGroceryItemStatus, IGroceryItem } from '../../models/grocery-item';
import { GroceryTypesTranslator } from '../../utils/grocery-types-translator';
import ToggleMenu, { IToggleMenuRef } from '../shared/ToggleMenu';
import styles from './GroceryItem.module.scss';

enum eMenuActions {
    Edit,
    Delete,
}

const GroceryItem: React.FC<{ item: IGroceryItem, onItemChange: (item: Partial<IGroceryItem>) => void }> = ({
                                                                                                                item,
                                                                                                                onItemChange,
                                                                                                            }) => {
    const priorityMenuRef = useRef<IToggleMenuRef>(null);
    const actionsMenuRef = useRef<IToggleMenuRef>(null);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const status = event.target.checked ? eGroceryItemStatus.Done : eGroceryItemStatus.Undone;
        onItemChange({ status, id: item.id });
    };
    const handlePriorityChange = (priority: eGroceryItemPriority) => {
        return () => {
            console.log(priority);
            priorityMenuRef.current?.closeMenu();
        };
    };
    const handleActionClick = (action: eMenuActions) => {
        return () => {
            console.log(action);
            actionsMenuRef.current?.closeMenu();
        };
    };

    // TODO: Move mapping to Redux selectors

    return (
        <Card
            className={styles.groceryItem + ' ' + (item.status === eGroceryItemStatus.Done ? styles.groceryItemDone : '')}>
            <CardContent className={styles.groceryItemContent}>
                <FormControlLabel disableTypography className={styles.groceryItemControl}
                                  control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                                                     onChange={handleChange}/>}
                                  label={item.name}/>


                <ToggleMenu ref={priorityMenuRef} toggleButton={<Chip
                    className={styles.groceryItemPriority + ' ' + styles[item.priority]}
                    label={GroceryTypesTranslator.toItemPriority(item.priority)}
                    variant={'outlined'}
                />}>
                    <MenuItem
                        onClick={handlePriorityChange(eGroceryItemPriority.Major)}>{GroceryTypesTranslator.toItemPriority(eGroceryItemPriority.Major)}</MenuItem>
                    <MenuItem
                        onClick={handlePriorityChange(eGroceryItemPriority.Medium)}>{GroceryTypesTranslator.toItemPriority(eGroceryItemPriority.Medium)}</MenuItem>
                    <MenuItem
                        onClick={handlePriorityChange(eGroceryItemPriority.Low)}>{GroceryTypesTranslator.toItemPriority(eGroceryItemPriority.Low)}</MenuItem>
                </ToggleMenu>
            </CardContent>
            <div className={styles.groceryItemActions}>
                <ToggleMenu ref={actionsMenuRef} toggleButton={
                    <IconButton>
                        <MoreVert/>
                    </IconButton>}>
                    <MenuItem onClick={handleActionClick(eMenuActions.Edit)}>
                        <ListItemIcon>
                            <Edit/>
                        </ListItemIcon>
                        <ListItemText>Редактировать</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleActionClick(eMenuActions.Delete)}>
                        <ListItemIcon>
                            <Delete/>
                        </ListItemIcon>
                        <ListItemText>Удалить</ListItemText>
                    </MenuItem>
                </ToggleMenu>
            </div>
        </Card>
    );
};

export default GroceryItem;
