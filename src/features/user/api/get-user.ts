import httpClient from '../../../services/http-client';
import { IUser } from '../models/user.interface';

export const getUser = (): Promise<IUser> => httpClient.get('users/me').json();
