import { Container } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.module.scss';
import styles from './App.module.scss';
import { queryClient } from './config/react-query';
import { selectUser } from './features/auth/store/auth-selectors';
import AlertProvider from './providers/alert-provider';
import AppRoutes from './routes/AppRoutes';
import Footer from './shared/Footer';
import Header from './shared/Header';

function App() {
    const { user, loading } = useSelector(selectUser);
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter basename={'/'}>
                <AlertProvider>
                    <div className={styles.mainContent}>
                        <Header user={user}/>
                        <Container className={styles.mainContentBody}>
                            <AppRoutes/>
                        </Container>
                        {!loading && !!user && <Footer/>}
                    </div>
                </AlertProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
