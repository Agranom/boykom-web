import { Autocomplete, Button, TextField } from '@mui/material';
import { uniqBy } from 'lodash';
import React, { useState } from 'react';
import { IUser } from '../../user/models/user.interface';
import GroupItem from './GroupItem';
import styles from './NewUsersGroup.module.scss';

type UserAutocompleteProps = {
    options: IUser[];
    onSubmit: (userIds: string[]) => void;
}

const NewUsersGroup: React.FC<UserAutocompleteProps> = ({ options, onSubmit }) => {
    const [users, setUsers] = useState<IUser[]>([]);

    const handleChange = (event: any, newValue: IUser | null) => {
        setUsers((preVUsers) => {
            if (newValue) {
                return uniqBy([...preVUsers, newValue], 'id');
            }
            return preVUsers;
        });
    };
    const handleSubmit = () => {
        onSubmit(users.map(u => u.id));
        setUsers([]);
    };
    return (
        <>
            <Autocomplete
                renderInput={(params) => <TextField {...params} variant={'standard'} label="Участник"
                                                    placeholder="Выберите участника"/>}
                options={options}
                getOptionLabel={(option: IUser) => option.username}
                onChange={handleChange}
                value={null}
                blurOnSelect={true}
            />
            {!!users.length && <div className={styles.newUsersGroup}>
                {users.map(user => <GroupItem key={user.id} user={user}/>)}
              <Button color={'primary'} variant={'contained'} fullWidth onClick={handleSubmit}>Добавить</Button>
            </div>}
        </>
    );
};

export default NewUsersGroup;
