import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../config/react-query';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';

export const deleteGroup = (groupId: string): Promise<any> => {
    return httpClient.delete(`family-groups/${groupId}`).json();
};

export const useDeleteGroup = () => {
    return useMutation({
        onSuccess: () => queryClient.invalidateQueries([queryKeys.familyGroup]),
        mutationFn: deleteGroup,
    });
};
