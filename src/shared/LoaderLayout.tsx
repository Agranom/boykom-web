import { CircularProgress } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import styles from './LoaderLayout.module.scss';

type LoaderLayoutProps = PropsWithChildren & {
    isLoading: boolean;
}

const LoaderLayout: React.FC<LoaderLayoutProps> = React.memo(({ children, isLoading }) => {
    return (
        <div className={styles.loaderLayout}>
            {isLoading ? <CircularProgress className={styles.loaderLayoutLoader}/> : children}
        </div>
    );
});

export default LoaderLayout;
