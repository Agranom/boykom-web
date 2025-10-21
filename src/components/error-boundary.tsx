import React, { Component, ReactNode, useContext } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { AlertContext } from '../contexts/AlertContext';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    error: Error | null;
}

// Separate functional component for the error UI
const ErrorFallback = ({ onReset }: { onReset: () => void }) => {
    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                padding: 4,
                textAlign: 'center'
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Something went wrong
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={onReset}
            >
                Try again
            </Button>
        </Box>
    );
};

// Wrapper component to handle alert context
const ErrorBoundaryWithAlert = ({ children }: ErrorBoundaryProps) => {
    const { showError } = useContext(AlertContext);
    
    return (
        <ErrorBoundaryInternal showError={showError}>
            {children}
        </ErrorBoundaryInternal>
    );
};

// Internal class component for error boundary functionality
class ErrorBoundaryInternal extends Component<ErrorBoundaryProps & { showError: (message: string) => void }> {
    state: ErrorBoundaryState = {
        error: null
    };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error };
    }

    componentDidCatch(error: Error) {
        console.error('Error caught by ErrorBoundary:', error);
        this.props.showError(error.message);
    }

    handleReset = () => {
        this.setState({ error: null });
    };

    render() {
        if (this.state.error) {
            return <ErrorFallback onReset={this.handleReset} />;
        }

        return this.props.children;
    }
}

// Export the wrapper component as the main ErrorBoundary
export const ErrorBoundary = ErrorBoundaryWithAlert;