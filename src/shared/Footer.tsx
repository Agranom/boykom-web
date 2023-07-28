import { Groups, Home } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { eAppRoutes } from '../const/app-routes.enum';
import styles from './Footer.module.scss';

const Footer = () => {
    const [value, setValue] = React.useState(eAppRoutes.Home);
    const navigate = useNavigate();
    const handleChange = (event: React.SyntheticEvent, newValue: eAppRoutes) => {
        setValue(newValue);
        navigate(newValue);
    };
    return (
        <footer className={styles.footer}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={handleChange}
            >
                <BottomNavigationAction value={eAppRoutes.Home} label="Главная" icon={<Home fontSize={'large'}/>}/>
                <BottomNavigationAction value={eAppRoutes.Groups} label="Группы" icon={<Groups fontSize={'large'}/>}/>
            </BottomNavigation>
        </footer>
    );
};

export default Footer;
