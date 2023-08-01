import { Delete, MoreVert } from '@mui/icons-material';
import { IconButton, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import React, { useRef } from 'react';
import ToggleMenu, { IToggleMenuRef } from '../../../shared/ToggleMenu';
import UserAvatar from '../../../shared/UserAvatar';
import { IUser } from '../../user/models/user.interface';
import styles from './GroupItem.module.scss';

type GroupItemProps = {
    user: IUser;
    isClickable?: boolean;
    isOwner?: boolean;
    onDeleteMember?: (memberId: string) => void;
}

const GroupItem: React.FC<GroupItemProps> = ({ user, isClickable, isOwner, onDeleteMember }) => {
    const actionsMenuRef = useRef<IToggleMenuRef>(null);
    const handleDeleteMember = () => {
        actionsMenuRef.current?.closeMenu();
        if (onDeleteMember) {
            onDeleteMember(user.id);
        }
    };
    return (
        <div className={styles.groupItem}>
            <UserAvatar firstName={user.firstName} lastName={user.lastName}/>
            <div className={styles.groupItemUserInfo}>
                <p className={styles.groupItemUserName}>{user.firstName + ' ' + user.lastName}</p>
                <span className={styles.groupItemRole}>
                    {isOwner ? 'Администратор группы' : 'Участник'}
                </span>
            </div>
            {isClickable && !isOwner && <div>
              <ToggleMenu ref={actionsMenuRef} toggleButton={
                  <IconButton>
                      <MoreVert/>
                  </IconButton>}>
                <MenuItem onClick={handleDeleteMember}>
                  <ListItemIcon>
                    <Delete/>
                  </ListItemIcon>
                  <ListItemText>Удалить из группы</ListItemText>
                </MenuItem>
              </ToggleMenu>
            </div>}
        </div>
    );
};

export default GroupItem;
