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
import React, { useEffect, useRef } from 'react';
import ToggleMenu, { IToggleMenuRef } from '../../shared/ToggleMenu';
import { GroceryTypesTranslator } from '../../utils/grocery-types-translator';
import styles from './GroceryItem.module.scss';
import { eGroceryItemPriority, eGroceryItemStatus, IGroceryItem } from './models/grocery-item';

declare const Swiped: any;

enum eMenuActions {
    Edit,
    Delete,
}

type GroceryItemProps = {
    item: IGroceryItem;
    onItemUpdate: (item: IGroceryItem) => void;
    onItemDelete: (id: string) => void;
}

const GroceryItem: React.FC<GroceryItemProps> = React.memo(({
                                                                item,
                                                                onItemUpdate,
                                                                onItemDelete,
                                                            }) => {
    const priorityMenuRef = useRef<IToggleMenuRef>(null);
    const actionsMenuRef = useRef<IToggleMenuRef>(null);

    useEffect(() => {
        if (item.status === eGroceryItemStatus.Undone) {
            Swiped.init({
                query: `.swiped-item-${item.id}`,
                right: 400,
                tolerance: 200,
                onOpen: function () {
                    onItemDelete(item.id as string);
                },
            });
        }

    }, [item.status]);

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const status = event.target.checked ? eGroceryItemStatus.Done : eGroceryItemStatus.Undone;
        onItemUpdate({ ...item, status } as IGroceryItem);
    };
    const handlePriorityChange = (priority: eGroceryItemPriority) => {
        return () => {
            onItemUpdate({ ...item, priority });
            priorityMenuRef.current?.closeMenu();
        };
    };
    const handleActionClick = (action: eMenuActions) => {
        return () => {
            if (action === eMenuActions.Delete) {
                onItemDelete(item.id as string);
            }
            actionsMenuRef.current?.closeMenu();
        };
    };

    return (
        <div className={styles.swipedItemWrapper}>
            <div className={`swiped-item-${item.id} ${styles.swipedItemWrapperInner}`}>
                <Card
                    className={styles.groceryItem + ' ' + (item.status === eGroceryItemStatus.Done ? styles.groceryItemDone : '')}>
                    <CardContent className={styles.groceryItemContent}>
                        <FormControlLabel disableTypography className={styles.groceryItemControl}
                                          control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                                                             checked={item.status === eGroceryItemStatus.Done}
                                                             onChange={handleStatusChange}/>}
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
            </div>
        </div>
    );
});

export default GroceryItem;
