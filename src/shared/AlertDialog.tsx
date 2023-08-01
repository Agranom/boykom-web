import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { PropsWithChildren } from 'react';

type AlertDialogProps = PropsWithChildren & {
    title?: string;
    isOpened: boolean;
    onConfirm: () => void;
    onReject: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ children, isOpened, title, onConfirm, onReject }) => {
    return (
        <Dialog open={isOpened}>
            <DialogTitle>
                {title || 'Вы уверены?'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{children}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onReject}>Нет</Button>
                <Button onClick={onConfirm} autoFocus>Да</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AlertDialog;
