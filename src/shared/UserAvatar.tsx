import { Avatar } from '@mui/material';
import React from 'react';

type UserAvatarProps = {
    firstName: string | undefined;
    lastName: string | undefined;
}

const UserAvatar:React.FC<UserAvatarProps> = ({firstName, lastName}) => {
    const firstNameShortcut = firstName ? firstName[0] : '';
    const lastNameShortcut = lastName ? lastName[0] : '';
    return (
        <Avatar alt={`${firstName} ${lastName}`} sx={{ fontSize: '1.4rem' }}>{firstNameShortcut + lastNameShortcut}</Avatar>
    )
}

export default UserAvatar;
