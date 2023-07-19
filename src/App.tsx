import { Container } from '@mui/material';
import React from 'react';
import './App.scss';
import Grocery from './grocery/Grocery';
import Header from './shared/Header';

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
