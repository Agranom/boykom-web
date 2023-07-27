import httpClient from '../../../services/http-client';
import tokenStorage from '../../../utils/token-storage';
import { IUserResponse } from '../models/user-response.interface';

export interface ISignInCredsDTO {
    username: string;
    password: string;
}

export const signIn = async (data: ISignInCredsDTO): Promise<IUserResponse> => {
    const response: IUserResponse = await httpClient.post('auth/sign-in', { json: data }).json();
    tokenStorage.setToken(response.access_token);

    return response;
};
