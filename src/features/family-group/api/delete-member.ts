import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../config/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { IFamilyGroup } from '../models/family-group.interface';

type DeleteMemberDto = {
    groupId: string;
    memberId: string;
}

export const deleteMember = ({ groupId, memberId }: DeleteMemberDto): Promise<{ memberId: string }> => {
    return httpClient.delete(`family-groups/${groupId}/${memberId}`).json();
};

export const useDeleteMember = () => {
    return useMutation({
        onMutate: async (values: DeleteMemberDto) => {
            await queryClient.cancelQueries([queryKeys.familyGroup]);
            const previousGroup = queryClient.getQueryData<IFamilyGroup>([queryKeys.familyGroup]);
            queryClient.setQueryData([queryKeys.familyGroup], () => {
                return { ...previousGroup, members: previousGroup?.members?.filter(m => m.userId !== values.memberId) };
            });

            return {previousGroup};
        },
        onSuccess: () => {
            queryClient.invalidateQueries([queryKeys.familyGroup]);
        },
        onError: (_, __, context) => {
            if (context?.previousGroup) {
                queryClient.setQueryData([queryKeys.familyGroup], context.previousGroup);
            }
        },
        mutationFn: deleteMember,
    });
};
