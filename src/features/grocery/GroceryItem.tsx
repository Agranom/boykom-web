import { Delete, Kitchen, LocalGroceryStore, MoreVert } from '@mui/icons-material';
import {
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Tooltip,
} from '@mui/material';
import React, { useEffect, useRef } from 'react';
import ToggleMenu, { IToggleMenuRef } from '../../shared/ToggleMenu';
import styles from './GroceryItem.module.scss';
import { eGroceryItemStatus, IGroceryItem } from './models/grocery-item';

declare const Swiped: any;

enum eMenuActions {
    Edit,
    Delete,
}

type GroceryItemProps = {
    item: IGroceryItem;
    onItemUpdate: (item: Partial<IGroceryItem>) => void;
    onItemDelete: (id: string) => void;
}

const GroceryItem: React.FC<GroceryItemProps> = React.memo(({
                                                                item,
                                                                onItemUpdate,
                                                                onItemDelete,
                                                            }) => {
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
        onItemUpdate({ status, version: item.version, id: item.id  });
    };

    const handleMoveItem = () => {
        onItemUpdate({ 
            inFridge: !item.inFridge, // Toggle the inFridge status
            version: item.version, 
            id: item.id 
        });
    };

    const handleActionClick = (action: eMenuActions) => {
        return () => {
            if (action === eMenuActions.Delete) {
                onItemDelete(item.id as string);
            }
            actionsMenuRef.current?.closeMenu();
        };
    };

    const isInFridge = !!item.inFridge;

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

                        <Tooltip title={isInFridge ? "В список покупок" : "В холодильник"}>
                            <IconButton
                                onClick={handleMoveItem}
                                className={styles.moveButton}
                                color="primary"
                                size="large"
                            >
                                {isInFridge ? <LocalGroceryStore fontSize="medium" /> : <Kitchen fontSize="medium" />}
                            </IconButton>
                        </Tooltip>
                    </CardContent>
                    <div className={styles.groceryItemActions}>
                        <ToggleMenu ref={actionsMenuRef} toggleButton={
                            <IconButton>
                                <MoreVert/>
                            </IconButton>}>
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
