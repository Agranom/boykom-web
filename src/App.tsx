import { Container } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import './App.scss';
import { queryClient } from './config/reqct-query';
import Grocery from './features/grocery/Grocery';
import Header from './shared/Header';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Header/>
            <Container>
                <Grocery/>
            </Container>
        </QueryClientProvider>
    );
}

export default App;
