import React from 'react';
import styles from './LoaderPrimary.module.scss';
import { CircularProgress } from '@mui/material';

const LoaderPrimary = () => {
  return (
    <div className={styles.loaderPrimary}><CircularProgress /></div>
  );
}

export default LoaderPrimary;