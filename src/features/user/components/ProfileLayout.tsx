import React, { PropsWithChildren } from 'react';
import styles from './ProfileLayout.module.scss'

const ProfileLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.profileLayout}>{children}</div>
    );
};

export default ProfileLayout;
