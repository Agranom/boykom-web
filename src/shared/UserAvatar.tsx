import { Avatar } from '@mui/material';
import React from 'react';

type UserAvatarProps = {
    firstName: string;
    lastName: string;
}

const UserAvatar:React.FC<UserAvatarProps> = ({firstName, lastName}) => {
    return (
        <Avatar alt={`${firstName} ${lastName}`} sx={{ fontSize: '1.4rem' }}>{firstName[0] + lastName[0]}</Avatar>
    )
}

export default UserAvatar;
