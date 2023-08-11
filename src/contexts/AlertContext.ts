import { createContext } from 'react';

export type AlertContextValues = {
    showSuccess: (msg: string) => void;
    showError: (msg: string) => void;
    showWarn: (msg: string) => void;
}

export const AlertContext = createContext<AlertContextValues>({
    showSuccess: () => {},
    showError: () => {},
    showWarn: () => {},
});
