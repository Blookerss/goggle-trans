import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Gear, House, ClockHistory } from 'react-bootstrap-icons';

import App from '../components/App';
import Home from './home';
import Main from '/voxeliface/components/Main';
import Header from '../components/Header';
import History from './history';
import Settings from './settings';
import SideNavigation from '/voxeliface/components/SideNavigation';
import NavigationItem from '/voxeliface/components/SideNavigation/Item';
export default function Navigation() {
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    return <App>
        <Header/>
        <Main css={{ padding: 0 }}>
            <SideNavigation value={page} onChange={setPage}>
                <NavigationItem name={t('app.goggletrans.navigation.home')} icon={<House size={16}/>} value={0} direction="horizontal">
                    <Home/>
                </NavigationItem>
                <NavigationItem name={t('app.goggletrans.navigation.history')} icon={<ClockHistory size={16}/>} value={1} direction="horizontal">
                    <History/>
                </NavigationItem>
                <NavigationItem name={t('app.goggletrans.navigation.settings')} icon={<Gear size={16}/>} value={2} direction="horizontal">
                    <Settings/>
                </NavigationItem>
            </SideNavigation>
        </Main>
        <Toaster position="bottom-right" toastOptions={{
            style: {
                color: 'var(--colors-primaryColor)',
                fontSize: '.9rem',
                background: 'var(--colors-secondaryBackground)'
            }
        }}/>
    </App>;
};