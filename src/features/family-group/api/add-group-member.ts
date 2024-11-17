import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { queryClient } from '../../../config/react-query';
import { queryKeys } from '../../../const/query-keys';
import { AlertContext, AlertContextValues } from '../../../contexts/AlertContext';
import { IStatusResponse } from '../../../models/status-response.interface';
import httpClient from '../../../services/http-client';
import { IFamilyGroup, IGroupMember } from '../models/family-group.interface';

type AddGroupMemberDto = {
  groupId: string;
  username: string;
}

export const addGroupMember = ({ username, groupId }: AddGroupMemberDto): Promise<IGroupMember | IStatusResponse> => {
  return httpClient.post(`family-groups/${groupId}/member`, { json: { username } }).json();
};

export const useGroupMember = () => {
  const { showError, showSuccess } = useContext<AlertContextValues>(AlertContext);
  return useMutation({
    onMutate: async (newMember: AddGroupMemberDto) => {
      await queryClient.cancelQueries([queryKeys.familyGroup]);

      const prevGroup = queryClient.getQueryData<IFamilyGroup>([queryKeys.familyGroup]);

      queryClient.setQueryData([queryKeys.familyGroup], () => {
        return { ...prevGroup, members: [...(prevGroup?.members || []), newMember] };
      });

      return { prevGroup };
    },
    onSuccess: (response: IGroupMember | IStatusResponse, _, context) => {
      if ((response as IStatusResponse).message) {
        showError((response as IStatusResponse).message);

        if (context?.prevGroup) {
          queryClient.setQueryData([queryKeys.familyGroup], context.prevGroup);
        }
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
    mutationFn: addGroupMember,
  });
};
