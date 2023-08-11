import { Button } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AlertDialog from '../../../shared/AlertDialog';
import { selectUser } from '../../auth/store/auth-selectors';
import { useUsers } from '../../user/api/get-users';
import { IUser } from '../../user/models/user.interface';
import { useCreateGroup } from '../api/create-group';
import { useDeleteGroup } from '../api/delete-group';
import { useGroup } from '../api/get-group';
import { useUpdateGroup } from '../api/update-group';
import styles from './FamilyGroup.module.scss';
import GroupItem from './GroupItem';
import NewUsersGroup from './NewUsersGroup';

const FamilyGroup = () => {

    const { user } = useSelector(selectUser);
    const { data: familyGroup } = useGroup(user?.id);
    const { data: users } = useUsers();
    const { mutate: createGroup } = useCreateGroup();
    const { mutate: updateGroup } = useUpdateGroup();
    const { mutate: deleteGroup } = useDeleteGroup();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

    const groupOwner: IUser | undefined = users?.find(u => u.id === familyGroup?.ownerId);
    const isUserAdmin = groupOwner?.id === user?.id;

    const getUserIds = (users: IUser[]) => (username: string) => users.filter(u => u.username === username).map(u => u.id);
    const getUserIdsByUsername = getUserIds(users || []);
    const handleGroupSubmit = (username: string) => createGroup({ userIds: getUserIdsByUsername(username) });
    const addUsersToGroup = (username: string) => {
        updateGroup({ userIds: getUserIdsByUsername(username), ownerId: user?.id as string });
    };
    const handleDeleteUser = (userId: string) => {
        // updateGroup({
        //     userIds: familyGroup?.members?.filter(id => id !== userId) || [],
        //     ownerId: user?.id as string,
        // });
    };
    const handleDeleteGroup = () => setIsDeleteDialogOpen(true);
    const closeDialog = () => setIsDeleteDialogOpen(false);
    const handleDialogConfirm = () => {
        closeDialog();
        deleteGroup(familyGroup?.id as string);
    };


    return (
        <div className={styles.familyGroupLayout}>
            <h2>Ваша семейная группа</h2>
            {!!familyGroup &&
            <div>
              <div className={styles.familyGroup}>
                <div className={styles.familyGroupHeading}>
                  <h3 className={styles.familyGroupHeadingTitle}>Участники вашей семейной группы</h3>
                  <p className={styles.familyGroupHeadingSubtitle}>Здесь вы можете управлять своей семейной группой.</p>
                </div>
                  {!!groupOwner && <GroupItem key={familyGroup.ownerId} user={groupOwner} isActive={true} isOwner/>}
                  {familyGroup?.members?.map(member => <GroupItem user={users?.find(u => u.id === member.id)}
                                                                  key={member.id}
                                                                  isActive={member.isAccepted}
                                                                  showMenu={isUserAdmin}
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
        </div>
    );
};

export default FamilyGroup;
