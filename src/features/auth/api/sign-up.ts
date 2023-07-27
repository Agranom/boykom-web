import httpClient from '../../../services/http-client';

export interface ISignUpCredsDTO {
    username: string;
    password: string;
}

export const signUp = (data: ISignUpCredsDTO): Promise<void> => {
    return httpClient.post('auth/sign-up', { json: data }).json();
};
