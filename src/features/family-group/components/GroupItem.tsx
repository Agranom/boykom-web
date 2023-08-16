import { GroupRemove, MoreVert } from '@mui/icons-material';
import { IconButton, ListItemIcon, ListItemText, MenuItem, Skeleton } from '@mui/material';
import React, { useRef } from 'react';
import ToggleMenu, { IToggleMenuRef } from '../../../shared/ToggleMenu';
import UserAvatar from '../../../shared/UserAvatar';
import { IUser } from '../../user/models/user.interface';
import styles from './GroupItem.module.scss';

type GroupItemProps = {
    user: IUser | undefined;
    isActive: boolean;
    onDeleteMember?: (memberId: string) => void;
    showMenu?: boolean;
    isOwner?: boolean;
}

const GroupItem: React.FC<GroupItemProps> = React.memo(({ user, showMenu, isOwner, onDeleteMember, isActive = true }) => {
    const actionsMenuRef = useRef<IToggleMenuRef>(null);
    let roleLabel = 'Участник';
    if (!isActive) {
        roleLabel = 'Ожидается подтверждение';
    } else if (isOwner) {
        roleLabel = 'Администратор группы';
    }
    const handleDeleteMember = () => {
        actionsMenuRef.current?.closeMenu();
        if (onDeleteMember) {
            onDeleteMember(user?.id as string);
        }
    };
    return (
        <>
            {!!user && <div className={styles.groupItem}>
                {isActive ? <UserAvatar firstName={user.firstName} lastName={user.lastName}/>
                    : <Skeleton width={40} height={40} variant={'circular'}/>}
              <div className={styles.groupItemUserInfo}>
                  {isActive ? <p className={styles.groupItemUserName}>{user.firstName + ' ' + user.lastName}</p>
                      : <Skeleton width="70%"/>}
                  {isActive ? <p className={styles.groupItemRole}>
                      {user.username}
                  </p> : <Skeleton width="50%"/>}
                <p className={styles.groupItemRole}>
                    {roleLabel}
                </p>
              </div>
                {showMenu && <ToggleMenu ref={actionsMenuRef} toggleButton={
                    <IconButton>
                        <MoreVert/>
                    </IconButton>}>
                  <MenuItem onClick={handleDeleteMember}>
                    <ListItemIcon>
                      <GroupRemove/>
                    </ListItemIcon>
                    <ListItemText>{isOwner ? 'Удалить из группы' : 'Покинуть группу'}</ListItemText>
                  </MenuItem>
                </ToggleMenu>}
            </div>}
        </>
    );
});

export default GroupItem;
