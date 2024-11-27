import { Diversity3 } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AlertDialog from '../../../shared/AlertDialog';
import LoaderLayout from '../../../shared/LoaderLayout';
import { selectUser } from '../../auth/store/auth-selectors';
import { IUser } from '../../user/models/user.interface';
import { useAcceptMembership } from '../api/accept-membership';
import { useCreateGroup } from '../api/create-group';
import { useDeleteGroup } from '../api/delete-group';
import { useDeleteMember } from '../api/delete-member';
import styles from './FamilyGroup.module.scss';
import GroupItem from './GroupItem';
import NewUsersGroup from './NewUsersGroup';
import { useMyGroup } from '../api/get-my-group';
import { useGroupMember } from '../api/add-group-member';

const FamilyGroup = () => {

  const { user } = useSelector(selectUser);
  const { data: familyGroup, isLoading: isGroupLoading } = useMyGroup();
  const { mutate: createGroup } = useCreateGroup();
  const { mutate: addMember } = useGroupMember();
  const { mutate: deleteGroup } = useDeleteGroup();
  const { mutate: deleteMember } = useDeleteMember();
  const { mutate: acceptMembership } = useAcceptMembership();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const groupOwner: IUser | undefined = familyGroup?.members?.find(m => m.isOwner)?.user;
  const isGroupOwner = groupOwner?.id === user?.id;
  const groupMembers = familyGroup?.members
    ?.filter(m => !m.isOwner)
    .sort((a, b) => Number(b.isAccepted) - Number(a.isAccepted)) || [];
  const isGroupAccepted = groupMembers.find(member => member.user?.id === user?.id)?.isAccepted;

  const handleGroupSubmit = (username: string) => createGroup({ username });
  const addUsersToGroup = (username: string) => {
    addMember({ username, groupId: familyGroup?.id! });
  };
  const handleDeleteMember = (memberId: string) => {
    deleteMember({ groupId: familyGroup?.id as string, memberId });
  };
  const handleDeleteGroup = () => setIsDeleteDialogOpen(true);
  const closeDialog = () => setIsDeleteDialogOpen(false);
  const handleDialogConfirm = () => {
    closeDialog();
    deleteGroup(familyGroup?.id as string);
  };
  const handleAcceptMembership = () => acceptMembership(familyGroup?.id as string);

  return (
    <div className={styles.familyGroupLayout}>
      <h2>Ваша семейная группа</h2>
      <LoaderLayout isLoading={isGroupLoading}>
        {!!familyGroup && !!user && !isGroupOwner && !isGroupAccepted &&
          <div className={styles.groupRequestContainer}>
            <Diversity3 color={'action'} className={styles.groupRequestContainerIcon}/>
            <p>Запрос на вступление в группу от {groupOwner?.firstName + ' ' + groupOwner?.lastName} ожидает
              подтверждения</p>
            <Button color={'primary'} variant={'contained'} size={'large'}
                    onClick={handleAcceptMembership}>Подтвердить</Button>
          </div>
        }
        {!!familyGroup && (isGroupOwner || isGroupAccepted) &&
          <div>
            <div className={styles.familyGroup}>
              <div className={styles.familyGroupHeading}>
                <h3 className={styles.familyGroupHeadingTitle}>Участники вашей семейной группы</h3>
                <p className={styles.familyGroupHeadingSubtitle}>Здесь вы можете управлять своей семейной
                  группой.</p>
              </div>
              {!!groupOwner && <GroupItem key={familyGroup.id} user={groupOwner} isActive={true} isAdmin/>}
              {groupMembers
                .filter(m => isGroupOwner || m.isAccepted)
                .map(member => <GroupItem user={member.user}
                                          key={member.id}
                                          isActive={member.isAccepted}
                                          showMenu={true}
                                          isAdmin={false}
                                          isOwner={isGroupOwner}
                                          onDeleteMember={() => handleDeleteMember(member.id)}/>)}
              {isGroupOwner && <div className={styles.familyGroupActions}>
                <Button color={'primary'} onClick={handleDeleteGroup}>Удалить семейную группу</Button>
              </div>}

            </div>
            {isGroupOwner && <>
              <h4>Добавьте нового участника в группу</h4>
              <NewUsersGroup
                onSubmit={addUsersToGroup}/>
            </>}
          </div>
        }
        {!familyGroup && <div className={styles.familyGroupEmpty}>
          <div className={styles.familyGroupEmptyText}>
            <h3 className={styles.familyGroupHeadingTitle}>В вашей группе нет участников</h3>
            <p>Добавьте участников в вашу семейную группу.</p>
          </div>
          <NewUsersGroup onSubmit={handleGroupSubmit}/>
        </div>}
        <AlertDialog isOpened={isDeleteDialogOpen} onConfirm={handleDialogConfirm} onReject={closeDialog}
                     title={'Вы уверены, что хотите удалить семейную группу?'}>
          Все участники этой группы будут удалены навсегда.
        </AlertDialog>
      </LoaderLayout>
    </div>
  );
};

export default FamilyGroup;
