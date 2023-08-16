import { Diversity3 } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AlertDialog from '../../../shared/AlertDialog';
import LoaderLayout from '../../../shared/LoaderLayout';
import { selectUser } from '../../auth/store/auth-selectors';
import { useUsers } from '../../user/api/get-users';
import { IUser } from '../../user/models/user.interface';
import { useAcceptMembership } from '../api/accept-membership';
import { useCreateGroup } from '../api/create-group';
import { useDeleteGroup } from '../api/delete-group';
import { useDeleteMember } from '../api/delete-member';
import { useGroup } from '../api/get-group';
import { useUpdateGroup } from '../api/update-group';
import styles from './FamilyGroup.module.scss';
import GroupItem from './GroupItem';
import NewUsersGroup from './NewUsersGroup';

const FamilyGroup = () => {

    const { user } = useSelector(selectUser);
    const { data: familyGroup, isLoading: isGroupLoading } = useGroup(user?.id);
    const { data: users } = useUsers();
    const { mutate: createGroup } = useCreateGroup();
    const { mutate: updateGroup } = useUpdateGroup();
    const { mutate: deleteGroup } = useDeleteGroup();
    const { mutate: deleteMember } = useDeleteMember();
    const { mutate: acceptMembership } = useAcceptMembership();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

    const groupOwner: IUser | undefined = users?.find(u => u.id === familyGroup?.ownerId);
    const isUserAdmin = groupOwner?.id === user?.id;
    const isGroupAccepted = familyGroup?.members?.find(member => member.userId === user?.id)?.isAccepted;

    const getUserIds = (users: IUser[]) => (username: string) => users.filter(u => u.username === username).map(u => u.id);
    const getUserIdsByUsername = getUserIds(users || []);
    const handleGroupSubmit = (username: string) => createGroup({ userIds: getUserIdsByUsername(username) });
    const addUsersToGroup = (username: string) => {
        updateGroup({ userIds: getUserIdsByUsername(username), groupId: familyGroup?.id as string });
    };
    const handleDeleteUser = (userId: string) => {
        deleteMember({ groupId: familyGroup?.id as string, memberId: userId });
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
                {!!familyGroup && !!user && !isUserAdmin && !isGroupAccepted &&
                <div className={styles.groupRequestContainer}>
                  <Diversity3 color={'action'} className={styles.groupRequestContainerIcon}/>
                  <p>Запрос на вступление в группу от {groupOwner?.firstName + ' ' + groupOwner?.lastName} ожидает
                    подтверждения</p>
                  <Button color={'primary'} variant={'contained'} size={'large'}
                          onClick={handleAcceptMembership}>Подтвердить</Button>
                </div>
                }
                {!!familyGroup && (isUserAdmin || isGroupAccepted) &&
                <div>
                  <div className={styles.familyGroup}>
                    <div className={styles.familyGroupHeading}>
                      <h3 className={styles.familyGroupHeadingTitle}>Участники вашей семейной группы</h3>
                      <p className={styles.familyGroupHeadingSubtitle}>Здесь вы можете управлять своей семейной
                        группой.</p>
                    </div>
                      {!!groupOwner && <GroupItem key={familyGroup.ownerId} user={groupOwner} isActive={true} isOwner/>}
                      {familyGroup?.members?.map(member => <GroupItem user={users?.find(u => u.id === member.userId)}
                                                                      key={member.userId}
                                                                      isActive={member.isAccepted}
                                                                      showMenu={true}
                                                                      isOwner={isUserAdmin}
                                                                      onDeleteMember={handleDeleteUser}/>)}
                      {isUserAdmin && <div className={styles.familyGroupActions}>
                        <Button color={'primary'} onClick={handleDeleteGroup}>Удалить семейную группу</Button>
                      </div>}

                  </div>
                    {isUserAdmin && <>
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
