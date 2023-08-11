import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { queryClient } from '../../../config/react-query';
import { queryKeys } from '../../../const/query-keys';
import { AlertContext, AlertContextValues } from '../../../contexts/AlertContext';
import { IStatusResponse } from '../../../models/status-response.interface';
import httpClient from '../../../services/http-client';

type CreateGroupDto = {
    userIds: string[]
}


export const createGroup = (data: CreateGroupDto): Promise<IStatusResponse> => {
    return httpClient.post('family-groups', { json: data }).json();
};

export const useCreateGroup = () => {
    const { showSuccess, showError } = useContext<AlertContextValues>(AlertContext);
    return useMutation({
        onSuccess: (response: IStatusResponse) => {
            if (response?.success) {
                showSuccess(response.message);
                queryClient.invalidateQueries([queryKeys.familyGroup]);
            } else {
                showError(response.message);
            }
        },
        mutationFn: createGroup,
    });
};
