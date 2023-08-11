export enum eAlertType {
    Success = 'success',
    Error = 'error',
    Warning = 'warning',
}

export interface IAlert {
    message: string;
    type: eAlertType;
}
