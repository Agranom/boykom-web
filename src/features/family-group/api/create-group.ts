import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../config/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { IFamilyGroup } from '../models/family-group.interface';

type CreateGroupDto = {
    userIds: string[]
}

export const createGroup = (data: CreateGroupDto): Promise<IFamilyGroup> => {
    return httpClient.post('family-groups', { json: data }).json();
};

export const useCreateGroup = () => {
    return useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.familyGroup]);
        },
        mutationFn: createGroup,
    });
};
