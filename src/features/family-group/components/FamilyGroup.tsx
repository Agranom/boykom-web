import { useSelector } from 'react-redux';
import { selectUser } from '../../auth/store/auth-selectors';
import { useUsers } from '../../user/api/get-users';
import { IUser } from '../../user/models/user.interface';
import { useCreateGroup } from '../api/create-group';
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
    const handleGroupSubmit = (userIds: string[]) => createGroup({ userIds });
    const addUserToGroup = (userIds: string[]) => {
        updateGroup({ userIds: [...(familyGroup?.memberIds || []), ...userIds], ownerId: user?.id as string });
    };
    const handleDeleteUser = (userId: string) => {
        updateGroup({
            userIds: familyGroup?.memberIds?.filter(id => id !== userId) || [],
            ownerId: user?.id as string,
        });
    };
    const groupOwner: IUser | undefined = users?.find(u => u.id === familyGroup?.ownerId);

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
                  {!!groupOwner && <GroupItem key={familyGroup.ownerId} user={groupOwner} isOwner isClickable/>}
                  {users?.filter(user => familyGroup?.memberIds?.includes(user.id))
                      .map(user => <GroupItem user={user} key={user.id} isClickable
                                              onDeleteMember={handleDeleteUser}/>)}
              </div>
                {groupOwner?.id === user?.id && <>
                  <h4>Добавьте нового участника в группу</h4>
                  <NewUsersGroup
                    options={users?.filter(u => u.id !== groupOwner?.id && !familyGroup?.memberIds.includes(u.id)) || []}
                    onSubmit={addUserToGroup}/>
                </>}
            </div>
            }
            {!familyGroup && <div className={styles.familyGroupEmpty}>
              <div className={styles.familyGroupEmptyText}>
                <h3 className={styles.familyGroupHeadingTitle}>В вашей группе нет участников</h3>
                <p>Добавьте участников в вашу семейную группу.</p>
              </div>
              <NewUsersGroup options={users?.filter(u => u.id !== user?.id) || []} onSubmit={handleGroupSubmit}/>
            </div>}
        </div>
    );
};

export default FamilyGroup;
