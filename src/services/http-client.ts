import ky from 'ky';
import tokenStorage from '../utils/token-storage';
import { HttpErrorHandler } from './http-error-handler';
import { AlertContext, AlertContextValues } from '../contexts/AlertContext';
import { useContext } from 'react';

// A singleton instance of the HTTP client for direct use
const httpClient = ky.extend({
    prefixUrl: process.env.REACT_APP_SERVER_URL,
    hooks: {
        beforeRequest: [
            (request) => {
                const authToken = tokenStorage.getToken();
                if (authToken) {
                    request.headers.set('Authorization', `Bearer ${tokenStorage.getToken()}`);
                }
                return request;
            },
        ],
    },
});

// A factory function that creates an HTTP client with error handling
export const createHttpClient = (options: { showError: (message: string) => void }) => {
    const errorHandler = new HttpErrorHandler(options);
    
    return ky.extend({
        prefixUrl: process.env.REACT_APP_SERVER_URL,
        hooks: {
            beforeRequest: [
                (request) => {
                    const authToken = tokenStorage.getToken();
                    if (authToken) {
                        request.headers.set('Authorization', `Bearer ${tokenStorage.getToken()}`);
                    }
                    return request;
                },
            ],
            afterResponse: [
                // Successfully response hook can be added here
            ],
            beforeError: [
                // Handle errors globally
                errorHandler.handleError,
            ],
        },
    });
};

// React hook to get HTTP client with error handling
export const useHttpClient = () => {
    const { showError } = useContext<AlertContextValues>(AlertContext);
    
    return createHttpClient({ showError });
};

export default httpClient;
