import httpClient from '../../../services/http-client';
import tokenStorage from '../../../utils/token-storage';
import { IAuthResponse } from '../models/auth-response.interface';

export interface ISignInCredsDTO {
    username: string;
    password: string;
}

export const signIn = async (data: ISignInCredsDTO): Promise<IAuthResponse> => {
    const response: IAuthResponse = await httpClient.post('auth/sign-in', { json: data }).json();
    tokenStorage.setToken(response.access_token);

    return response;
};
