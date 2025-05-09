import { HTTPError, KyResponse } from 'ky';
import tokenStorage from '../utils/token-storage';
import { eAlertType } from '../models/alert.interface';

export interface HttpErrorHandlerOptions {
    showError: (message: string) => void;
}

interface ErrorResponse {
    message?: string;
    error?: string;
}

export class HttpErrorHandler {
    private readonly showError: (message: string) => void;

    constructor(options: HttpErrorHandlerOptions) {
        this.showError = options.showError;
    }

    handleError = async (error: HTTPError): Promise<HTTPError> => {
        if (!error.response) {
            this.showError('Network error. Please check your connection.');
            return error;
        }

        const response = error.response as KyResponse;
        let errorMessage = 'An unexpected error occurred';
        
        try {
            const data = await response.json() as ErrorResponse;
            errorMessage = data.message || data.error || errorMessage;
        } catch (e) {
            // If parsing fails, use status text
            errorMessage = response.statusText || errorMessage;
        }

        // Handle specific status codes
        switch (response.status) {
            case 401:
                // Unauthorized - clear token
                tokenStorage.clearToken();
                this.showError('Your session has expired. Please log in again.');
                window.location.href = '/login';
                break;
            case 403:
                this.showError('You do not have permission to perform this action.');
                break;
            case 404:
                this.showError('Resource not found.');
                break;
            case 422:
                this.showError('Validation error: ' + errorMessage);
                break;
            case 500:
            case 502:
            case 503:
            case 504:
                this.showError('Server error. Please try again later.');
                break;
            default:
                this.showError(errorMessage);
                break;
        }

        return error;
    };
} 