import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import {  tabsRoutes } from '../../../routes/routes';
import Tabs from '../../Tabs/Tabs';

const MainPage: React.FC = () => {
    console.log(tabsRoutes)
    return (
        <>
            <Tabs/>
            <Routes>
                {tabsRoutes.map((route) => (
                    <Route key={route.path} path={route.path} element={<route.component />} />
                ))}
            </Routes>
        </>
    );
};

export default MainPage;