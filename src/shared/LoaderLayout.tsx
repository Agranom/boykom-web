import { CircularProgress } from '@mui/material';
import React, { Fragment, PropsWithChildren } from 'react';
import styles from './LoaderLayout.module.scss';

type LoaderLayoutProps = PropsWithChildren & {
    isLoading: boolean;
}

const LoaderLayout: React.FC<LoaderLayoutProps> = React.memo(({ children, isLoading }) => {
    return (
        <Fragment>
            {isLoading ?
                <div className={styles.loaderLayout}><CircularProgress className={styles.loaderLayoutLoader}/></div>
                : children}
        </Fragment>
    );
});

export default LoaderLayout;
