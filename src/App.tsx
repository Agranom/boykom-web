import { Container } from '@mui/material';
import React from 'react';
import './App.scss';
import Grocery from './components/grocery/Grocery';
import Header from './components/shared/Header';

function App() {
    return (
        <React.Fragment>
            <Header/>
            <Container>
                <Grocery/>
            </Container>
        </React.Fragment>
    );
}

export default App;
