import httpClient from '../../../services/http-client';

export interface ISignUpCredsDTO {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

export const signUp = (data: ISignUpCredsDTO): Promise<unknown> => {
    return httpClient.post('auth/sign-up', { json: data }).json();
};
