import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { IFamilyGroup } from '../models/family-group.interface';

export const getGroup = (userId: string): Promise<IFamilyGroup> => {
    return httpClient.get(`family-groups/${userId}`).json();
};

export const useGroup = (userId: string | undefined) => {
    return useQuery({
        queryKey: [queryKeys.familyGroup],
        queryFn: () => getGroup(userId as string),
        enabled: !!userId,
    });
};
