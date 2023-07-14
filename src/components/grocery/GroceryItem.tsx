import { Delete, Edit, MoreVert } from '@mui/icons-material';
import {
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from '@mui/material';
import React from 'react';
import { eGroceryItemStatus, IGroceryItem } from '../../models/grocery-item';
import { GroceryTypesTranslator } from '../../utils/grocery-types-translator';
import styles from './GroceryItem.module.scss';

const GroceryItem: React.FC<{ item: IGroceryItem, onItemChange: (item: Partial<IGroceryItem>) => void }> = ({
                                                                                                                item,
                                                                                                                onItemChange,
                                                                                                            }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const status = event.target.checked ? eGroceryItemStatus.Done : eGroceryItemStatus.Undone;
        onItemChange({ status, id: item.id });
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
                <p className={styles.groceryItemPriority + ' ' + styles[item.priority]}>{GroceryTypesTranslator.toItemPriority(item.priority)}</p>
            </CardContent>
            <div className={styles.groceryItemActions}>
                <IconButton onClick={handleMenuClick}>
                    <MoreVert/>
                </IconButton>
                <Menu open={open} anchorEl={anchorEl} onClose={handleMenuClose}>
                    <MenuItem onClick={handleMenuClose}>
                        <ListItemIcon>
                            <Delete/>
                        </ListItemIcon>
                        <ListItemText>Удалить</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        <ListItemIcon>
                            <Edit/>
                        </ListItemIcon>
                        <ListItemText>Редактировать</ListItemText>
                    </MenuItem>
                </Menu>
            </div>
        </Card>
    );
};

export default GroceryItem;
