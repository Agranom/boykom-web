import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../config/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { IFamilyGroup } from '../models/family-group.interface';

export const acceptMembership = (groupId: string): Promise<IFamilyGroup> => {
    return httpClient.post(`family-groups/${groupId}/accept-membership`).json();
};

export const useAcceptMembership = () => {
    return useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.familyGroup]);
        },
        mutationFn: acceptMembership,
    });
};
