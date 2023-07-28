import { Container } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.module.scss';
import { queryClient } from './config/react-query';
import { selectUser } from './features/auth/store/auth-selectors';
import AppRoutes from './routes/AppRoutes';
import Footer from './shared/Footer';
import Header from './shared/Header';
import styles from './App.module.scss'

function App() {
    const { user } = useSelector(selectUser);
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter basename={'/'}>
                <div className={styles.mainContent}>
                    <Header user={user}/>
                    <Container className={styles.mainContentBody}>
                        <AppRoutes/>
                    </Container>
                    <Footer/>
                </div>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
