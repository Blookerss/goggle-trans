import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { installUpdate } from '@tauri-apps/api/updater';
import { useTranslation } from 'react-i18next';
import { getName, getVersion } from '@tauri-apps/api/app';
import { useSelector, useDispatch } from 'react-redux';
import { XLg, Gear, House, Github, Download, ClockHistory } from 'react-bootstrap-icons';

import App from '../components/App';
import Home from './home';
import Main from '/voxeliface/components/Main';
import Grid from '/voxeliface/components/Grid';
import Header from '../components/Header';
import Button from '/voxeliface/components/Button';
import History from './history';
import Settings from './settings';
import Markdown from '/voxeliface/components/Markdown';
import Typography from '/voxeliface/components/Typography';
import SideNavigation from '/voxeliface/components/SideNavigation';
import NavigationItem from '/voxeliface/components/SideNavigation/Item';

import { ignoreUpdate } from '../common/slices/updater';
const appName = await getName(), appVersion = await getVersion();
export default function Navigation() {
    const { t } = useTranslation();
    const update = useSelector(state => state.updater.data);
    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const updateApp = () => {
        installUpdate().then(() => relaunch());
    };
    const updateDate = update?.date ? new Date(update.date.substring(0, update.date.indexOf(' +'))) : null;
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
        {update &&
            <Grid width="100%" height="100%" direction="vertical" alignItems="center" background="#00000099" justifyContent="center" css={{
                top: 0,
                left: 0,
                zIndex: 9998,
                position: 'absolute'
            }}>
                <Grid width="60%" padding={12} direction="vertical" background="$secondaryBackground" borderRadius={8} css={{
                    border: '1px solid $secondaryBorder2',
                    position: 'relative'
                }}>
                    <Typography size="1.2rem" color="$primaryColor" weight={600} family="Nunito Sans">
                        New Update Available
                    </Typography>
                    <Typography size=".9rem" color="$secondaryColor" weight={400} family="Nunito">
                        Version {update.version} - Released {updateDate.getTime() ? new Intl.RelativeTimeFormat('en', {
                            numeric: 'always' 
                        }).format(-Math.round((Date.now() - updateDate) / 86400000), 'day') : 'at an unknown date'}
                    </Typography>
                    <Typography size=".9rem" color="$secondaryColor" weight={400} family="Nunito">
                        You are currently running {appName} v{appVersion}
                    </Typography>

                    <Typography size=".9rem" color="$primaryColor" weight={400} margin="1rem 0 0" family="Nunito">
                        Release notes:
                    </Typography>
                    <Markdown text={update.body} css={{
                        padding: '.5rem .75rem',
                        overflow: 'auto',
                        maxHeight: '8rem',
                        background: '$secondaryBackground2',
                        borderRadius: 8
                    }}/>

                    <Grid margin="2rem 0 0" justifyContent="space-between">
                        <Grid spacing={8}>
                            <Button theme="accent" onClick={updateApp} disabled={update.updating}>
                                {update.updating ? <BasicSpinner size={16}/> : <Download size={14}/>}
                                Install Update
                            </Button>
                            <Button theme="secondary" onClick={() => dispatch(ignoreUpdate())} disabled={update.updating}>
                                <XLg/>
                                Later
                            </Button>
                        </Grid>
                        <Button theme="secondary" onClick={() => shell.open(`https://github.com/Blookerss/mdpkm/releases/tag/v${update.version}`)}>
                            <Github size={14}/>
                            View on GitHub
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        }
    </App>;
};