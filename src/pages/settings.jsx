import React from 'react';
import { HouseDoorFill } from 'react-bootstrap-icons';

import App from '../components/App';
import Main from '/voxeliface/components/Main';
import Link from '/voxeliface/components/Link/Tauri';
import Grid from '/voxeliface/components/Grid';
import Button from '/voxeliface/components/Button';
import Header from '../components/Header';
import Toggle from '../components/Toggle';
import Navigation from '../components/Navigation';
import Typography from '/voxeliface/components/Typography';

import DataController from '/src/common/dataController';
const SettingsData = await DataController.getData("settings");

export default class SettingsPage extends React.Component {
    render() {
        return (
            <App>
                <Header/>
                <Navigation title="Settings">
                    <Link to="/" text="Home" icon={<HouseDoorFill/>} color="#c7c6c6"/>
                </Navigation>
                <Main>
                    <Grid width="100%" spacing="64px" padding="0 0 64px 0" direction="vertical">
                        <Grid spacing="4px" direction="vertical">
                            <Typography text="Translation History" size="1.2rem"/>
                            <Typography text="This will determine wether translations can be saved." size="0.9rem" color="#cbcbcb"/>
                            <Typography text="Disabling history will not delete your existing history." size="0.9rem" color="#cbcbcb" margin="0 0 8px 0"/>
                            <Toggle
                                checked={SettingsData.get("history.enabled")}
                                changed={v => this.settingChanged("history.enabled", v)}
                            />
                        </Grid>
                        <Grid spacing="4px" direction="vertical">
                            <Typography text="Erase Data" size="1.2rem"/>
                            <Typography text="Erasing your data will delete all saved data," size="0.9rem" color="#cbcbcb"/>
                            <Typography text="including history and other settings." size="0.9rem" color="#cbcbcb" margin="0 0 8px 0"/>
                            <Button>
                                Erase All Data
                            </Button>
                        </Grid>
                    </Grid>
                </Main>
            </App>
        );
    }

    settingChanged(path, newValue) {
        SettingsData.set(path, newValue);
    }
};