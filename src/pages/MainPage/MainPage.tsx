import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

import { tabsRoutes } from '../../routes/routes';
import TabsNavigation from '../../components/TabsNavigation/TabsNavigation';




const MainPage: React.FC = () => {
    return (
        <>
            <TabsNavigation/>
            <Routes>
                {tabsRoutes.map((route) => (
                    <Route key={route.path} path={route.path} element={<route.component />} />
                ))}
            </Routes>
        </>
    );
};

export default MainPage;