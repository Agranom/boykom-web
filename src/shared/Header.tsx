import { AppBar, Container, Toolbar } from '@mui/material';
import React from 'react';
import { IUser } from '../features/user/models/user.interface';
import UserMenu from '../features/user/components/UserMenu';
import styles from './Header.module.scss'

const Header: React.FC<{ user: IUser | null}> = ({user}) => {
    return (
        <AppBar position={'sticky'}>
            <Container maxWidth="xl">
                <Toolbar className={styles.toolbar} disableGutters>
                    <div>
                        <h1 className={styles.toolbarLogo}>boyKom</h1>
                    </div>
                    {user && <UserMenu firstName={user.firstName} lastName={user.lastName}/>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
