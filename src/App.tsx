import { Container } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { queryClient } from './config/react-query';
import { selectUser } from './features/auth/store/auth-selectors';
import AppRoutes from './routes/AppRoutes';
import Header from './shared/Header';

function App() {
    const { user } = useSelector(selectUser);
    return (
        <QueryClientProvider client={queryClient}>
            <Header user={user}/>
            <Container>
                <BrowserRouter basename={'/'}>
                    <AppRoutes/>
                </BrowserRouter>
            </Container>
        </QueryClientProvider>
    );
}

export default App;
