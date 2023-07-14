import { AppBar, Container, Toolbar } from '@mui/material';

const Header = () => {
    return (
        <AppBar position={'sticky'}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <div>
                        <h1>boyKom</h1>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
