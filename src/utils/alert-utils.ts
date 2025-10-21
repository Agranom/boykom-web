import type { AlertContextValues } from '../contexts/AlertContext';

let alertUtils: AlertContextValues | null = null;

export const setAlertUtils = (utils: AlertContextValues) => {
    alertUtils = utils;
};

export const getAlertUtils = (): AlertContextValues => {
    if (!alertUtils) {
        return {
            showError: (msg) => console.error(msg),
            showSuccess: (msg) => console.log(msg),
            showWarn: (msg) => console.warn(msg),
        };
    }
    return alertUtils;
};
