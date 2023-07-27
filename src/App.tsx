import { Container } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { queryClient } from './config/reqct-query';
import AppRoutes from './routes/AppRoutes';
import Header from './shared/Header';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Header/>
            <Container>
                {/*<Grocery/>*/}
                <BrowserRouter basename={'/'}>
                    <AppRoutes/>
                </BrowserRouter>
            </Container>
        </QueryClientProvider>
    );
}

export default App;
