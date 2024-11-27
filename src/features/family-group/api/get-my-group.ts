import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { IFamilyGroup } from '../models/family-group.interface';

export const getMyGroup = (): Promise<IFamilyGroup> => {
    return httpClient.get(`family-groups/my-group`).json();
};

export const useMyGroup = () => {
    return useQuery({
        queryKey: [queryKeys.familyGroup],
        queryFn: () => getMyGroup(),
    });
};
