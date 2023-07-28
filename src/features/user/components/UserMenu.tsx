import { Avatar, IconButton, MenuItem, Tooltip } from '@mui/material';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import ToggleMenu, { IToggleMenuRef } from '../../../shared/ToggleMenu';
import { AppDispatch } from '../../../store/store';
import { signOut } from '../../auth/store/auth-slice';

type UserMenuProps = {
    firstName: string;
    lastName: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ firstName, lastName }) => {
    const menuRef = useRef<IToggleMenuRef>(null);
    const dispatch = useDispatch<AppDispatch>();
    const toggleButton = <Tooltip title="Открыть настройки">
        <IconButton sx={{ p: 0 }}>
            <Avatar alt={`${firstName} ${lastName}`} sx={{ fontSize: '1.4rem' }}>{firstName[0] + lastName[0]}</Avatar>
        </IconButton>
    </Tooltip>;
    const handleSignOut = () => {
        menuRef.current?.closeMenu();
        dispatch(signOut());
    };
    return (
        <>
            <ToggleMenu toggleButton={toggleButton} ref={menuRef}>
                <MenuItem onClick={handleSignOut}>Выйти</MenuItem>
            </ToggleMenu>
        </>
    );
};

export default UserMenu;
