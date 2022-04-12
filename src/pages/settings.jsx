import React from 'react';
import { HouseDoorFill } from 'react-bootstrap-icons';

import App from '../components/App';
import Main from '/voxeliface/components/Main';
import Link from '/voxeliface/components/Link/Tauri';
import Grid from '/voxeliface/components/Grid';
import Button from '/voxeliface/components/Button';
import Header from '../components/Header';
import Toggle from '../components/Toggle';
import Divider from '/voxeliface/components/Divider';
import Navigation from '../components/Navigation';
import Typography from '/voxeliface/components/Typography';

import DataController from '/src/common/dataController';
const SettingsData = await DataController.getData("settings");

export default function SettingsPage() {
    const settingChanged = (path, newValue) => SettingsData.set(path, newValue);
    return (
        <App>
            <Header/>
            <Navigation title="Settings">
                <Link to="/" text="Home" icon={<HouseDoorFill/>}/>
            </Navigation>
            <Main>
                <Grid width="100%" padding="0 0 64px 0" direction="vertical">
                    <Grid width="100%">
                        <Grid spacing="2px" direction="vertical" css={{ flexGrow: 1 }}>
                            <Typography size="1rem" family="Nunito">
                                Translation History
                            </Typography>
                            <Typography size=".9rem" color="#cbcbcb" family="Nunito">
                                This will determine whether translations can be saved.<br/>
                                Disabling history will not delete your existing history.
                            </Typography>
                        </Grid>
                        <Grid direction="vertical" justifyContent="center">
                            <Toggle
                                size="small"
                                checked={SettingsData.get("history.enabled")}
                                changed={v => settingChanged("history.enabled", v)}
                            />
                        </Grid>
                    </Grid>
                    <Divider width="100%" margin="1rem 0"/>
                    <Grid width="100%">
                        <Grid spacing="2px" direction="vertical" css={{ flexGrow: 1 }}>
                            <Typography size="1rem" family="Nunito">
                                Erase Data
                            </Typography>
                            <Typography size=".9rem" color="#cbcbcb" family="Nunito">
                                Erasing your data will delete all saved data, including history and other settings.
                            </Typography>
                        </Grid>
                        <Grid direction="vertical" justifyContent="center">
                            <Button>
                                Erase All Data
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Main>
        </App>
    );
};