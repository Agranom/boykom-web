import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { queryClient } from '../../../config/react-query';
import { queryKeys } from '../../../const/query-keys';
import { AlertContext, AlertContextValues } from '../../../contexts/AlertContext';
import { IStatusResponse } from '../../../models/status-response.interface';
import httpClient from '../../../services/http-client';
import { IFamilyGroup } from '../models/family-group.interface';

type UpdateGroupDto = {
    groupId: string;
    userIds: string[]
}

export const updateGroup = ({ userIds, groupId }: UpdateGroupDto): Promise<IFamilyGroup | IStatusResponse> => {
    return httpClient.put(`family-groups/${groupId}`, { json: { userIds } }).json();
};

export const useUpdateGroup = () => {
    const { showError, showSuccess } = useContext<AlertContextValues>(AlertContext);
    return useMutation({
        onMutate: async (newGroup: UpdateGroupDto) => {
            await queryClient.cancelQueries([queryKeys.familyGroup]);

            const prevGroup = queryClient.getQueryData<IFamilyGroup>([queryKeys.familyGroup]);

            queryClient.setQueryData([queryKeys.familyGroup], () => {
                return { ...prevGroup, memberIds: newGroup.userIds };
            });

            return { prevGroup };
        },
        onSuccess: (response: IFamilyGroup | IStatusResponse) => {
            if ((response as IStatusResponse).message) {
                showError((response as IStatusResponse).message);
            } else {
                showSuccess('Запрос отправлен');
                queryClient.invalidateQueries([queryKeys.familyGroup]);
            }
        },
        onError: (_, __, context) => {
            if (context?.prevGroup) {
                queryClient.setQueryData([queryKeys.familyGroup], context.prevGroup);
            }
        },
        mutationFn: updateGroup,
    });
};
