import { Avatar, IconButton, MenuItem, Tooltip } from '@mui/material';
import React, { useRef } from 'react';
import ToggleMenu, { IToggleMenuRef } from '../../shared/ToggleMenu';

type UserMenuProps = {
    firstName: string;
    lastName: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ firstName, lastName }) => {
    const menuRef = useRef<IToggleMenuRef>(null);
    const toggleButton = <Tooltip title="Открыть настройки">
        <IconButton sx={{ p: 0 }}>
            <Avatar alt={`${firstName} ${lastName}`} sx={{fontSize: '1.4rem'}}>VB</Avatar>
        </IconButton>
    </Tooltip>;
    const handleMenuClick = () => menuRef.current?.closeMenu();
    return (
        <>
            <ToggleMenu toggleButton={toggleButton} ref={menuRef}>
                <MenuItem onClick={handleMenuClick}>Профиль</MenuItem>
                <MenuItem onClick={handleMenuClick}>Выйти</MenuItem>
            </ToggleMenu>
        </>
    );
};

export default UserMenu;
