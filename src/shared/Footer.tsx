import { Groups, LocalGroceryStore, MenuBook, LunchDining } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { eAppRoutes } from '../const/app-routes.enum';
import styles from './Footer.module.scss';

const Footer = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation()
    const [value, setValue] = useState(pathname.substring(1) || eAppRoutes.Home);
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
                <BottomNavigationAction value={eAppRoutes.Home} label="Покупки" icon={<LocalGroceryStore fontSize={'large'}/>}/>
                <BottomNavigationAction value={eAppRoutes.Recipes} label="Рецепты" icon={<MenuBook fontSize={'large'}/>}/>
                <BottomNavigationAction value={eAppRoutes.Groups} label="Группы" icon={<Groups fontSize={'large'}/>}/>
                <BottomNavigationAction value={eAppRoutes.Nutrition} label="Питание" icon={<LunchDining fontSize={'large'}/>}/>
            </BottomNavigation>
        </footer>
    );
};

export default Footer;
