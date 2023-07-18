import { Menu } from '@mui/material';
import React, { forwardRef, useImperativeHandle } from 'react';


export interface IToggleMenuRef {
    closeMenu: () => void;
}

const ToggleMenu = forwardRef<IToggleMenuRef, React.PropsWithChildren<{ toggleButton: any }>>((props, ref) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    useImperativeHandle(ref, () => ({
        closeMenu() {
            handleMenuClose();
        },
    }));

    return (
        <React.Fragment>
            <div onClick={handleMenuClick}>{props.toggleButton}</div>
            <Menu open={isOpen} anchorEl={anchorEl} onBackdropClick={handleMenuClose}>
                {props.children}
            </Menu>
        </React.Fragment>
    );
});

export default ToggleMenu;
