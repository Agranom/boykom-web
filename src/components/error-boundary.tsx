import React, { ReactNode, useState, useContext, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { AlertContext } from '../contexts/AlertContext';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

// This component is used internally by ErrorBoundary
const ErrorFallback = ({ 
    error, 
    resetErrorBoundary 
}: { 
    error: Error | null; 
    resetErrorBoundary: () => void;
}) => {
    const { showError } = useContext(AlertContext);
    
    useEffect(() => {
        if (error && showError) {
            showError(`An error occurred: ${error.message}`);
        }
    }, [error, showError]);
    
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
            <Typography variant="body1" color="text.secondary" gutterBottom>
                {error?.message || 'An unexpected error occurred'}
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={resetErrorBoundary}
            >
                Try again
            </Button>
        </Box>
    );
};

// Custom hook to create an error boundary 
export function useErrorBoundary() {
    const [error, setError] = useState<Error | null>(null);
    
    const resetBoundary = () => setError(null);
    
    return {
        error,
        resetBoundary,
        errorHandler: (e: Error) => {
            console.error('Error caught by ErrorBoundary:', e);
            setError(e);
        }
    };
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children, fallback }) => {
    const { error, resetBoundary, errorHandler } = useErrorBoundary();
    
    useEffect(() => {
        // This will catch errors in lifecycle methods and hooks
        const errorListener = (event: ErrorEvent) => {
            event.preventDefault();
            errorHandler(event.error);
        };
        
        // This will catch promises rejection errors
        const rejectionListener = (event: PromiseRejectionEvent) => {
            event.preventDefault();
            errorHandler(new Error(event.reason?.message || 'Promise rejected'));
        };
        
        window.addEventListener('error', errorListener);
        window.addEventListener('unhandledrejection', rejectionListener);
        
        return () => {
            window.removeEventListener('error', errorListener);
            window.removeEventListener('unhandledrejection', rejectionListener);
        };
    }, [errorHandler]);
    
    if (error) {
        if (fallback) {
            return <>{fallback}</>;
        }
        
        return <ErrorFallback error={error} resetErrorBoundary={resetBoundary} />;
    }
    
    try {
        return <>{children}</>;
    } catch (e) {
        errorHandler(e instanceof Error ? e : new Error(String(e)));
        return <ErrorFallback error={error} resetErrorBoundary={resetBoundary} />;
    }
}; 