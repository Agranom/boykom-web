import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { IUser } from '../models/user.interface';

export const getUsers = (): Promise<IUser[]> => {
    return httpClient.get('users', ).json();
};


export const useUsers = () => {
    return useQuery({ queryKey: [queryKeys.user], queryFn: getUsers });
};
