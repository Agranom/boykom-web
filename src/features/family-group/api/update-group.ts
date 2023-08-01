import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../config/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { IFamilyGroup } from '../models/family-group.interface';

type UpdateGroupDto = {
    ownerId: string;
    userIds: string[]
}

export const updateGroup = ({ userIds, ownerId }: UpdateGroupDto): Promise<IFamilyGroup> => {
    return httpClient.put(`family-groups/${ownerId}`, { json: { userIds } }).json();
};

export const useUpdateGroup = () => {
    return useMutation({
        onMutate: async (newGroup: UpdateGroupDto) => {
            await queryClient.cancelQueries([queryKeys.familyGroup]);

            const prevGroup = queryClient.getQueryData<IFamilyGroup>([queryKeys.familyGroup]);

            queryClient.setQueryData([queryKeys.familyGroup], () => {
                return {...prevGroup, memberIds: newGroup.userIds};
            });

            return { prevGroup };
        },
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.familyGroup]);
        },
        onError: (_, __, context) => {
            if (context?.prevGroup) {
                queryClient.setQueryData([queryKeys.familyGroup], context.prevGroup);
            }
        },
        mutationFn: updateGroup,
    });
};
