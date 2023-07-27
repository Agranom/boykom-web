import { AppBar, Container, Toolbar } from '@mui/material';
import UserMenu from '../features/user/UserMenu';
import styles from './Header.module.scss'

const Header = () => {
    return (
        <AppBar position={'sticky'}>
            <Container maxWidth="xl">
                <Toolbar className={styles.toolbar} disableGutters>
                    <div>
                        <h1>boyKom</h1>
                    </div>
                    <UserMenu firstName={'Vitalii'} lastName={'Boiko'}/>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
