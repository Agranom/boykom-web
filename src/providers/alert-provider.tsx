import { Alert, Snackbar } from '@mui/material';
import React, { PropsWithChildren, useState, useEffect } from 'react';
import { AlertContext } from '../contexts/AlertContext';
import { eAlertType, IAlert } from '../models/alert.interface';
import { setAlertUtils } from '../utils/alert-utils';


const AlertProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [alert, setAlert] = useState<IAlert | null>(null);
    const handleAlert = (type: eAlertType) => (message: string) => setAlert({ message, type });
    const handleOnClose = () => setAlert(null);

    const alertUtils = {
        showSuccess: handleAlert(eAlertType.Success),
        showError: handleAlert(eAlertType.Error),
        showWarn: handleAlert(eAlertType.Warning),
    };

    useEffect(() => {
        setAlertUtils(alertUtils);
    }, []);

    return (
        <AlertContext.Provider value={alertUtils}>
            {children}
            {!!alert && <Snackbar open={true} autoHideDuration={6000} onClose={handleOnClose}
                                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
              <Alert severity={alert.type} sx={{fontSize: '1.2rem'}}>{alert.message}</Alert>
            </Snackbar>}
        </AlertContext.Provider>
    );
};


export default AlertProvider;
