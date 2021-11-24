import App from '../components/App';
import Main from '../components/Main';
import Link from '../components/Link';
import Grid from '../components/Grid';
import Button from '../components/Button';
import Header from '../components/Header';
import Toggle from '../components/Toggle';
import Navigation from '../components/Navigation';
import Typography from '../components/Typography';

import React from 'react';
import styled from 'styled-components';

const ListComponent = styled(Grid)`
    width: 100%;
`;

const DataController = window.$__DATA__;
let SettingsData = DataController.getData("settings").then(_ => SettingsData = _);
class SettingsPage extends React.Component {
    render() {
        if(SettingsData instanceof Promise) {
            SettingsData.then(_ => this.forceUpdate());
            return (
                <App>
                    <Header text="goggle trans" icon={"/favicon.ico"} />
                </App>
            );
        }
        return (
            <App>
                <Header text="goggle trans" icon={"/favicon.ico"} />
                <Navigation title="Settings">
                    <Link to="/" text="Home" icon="bi bi-house-door-fill"/>
                </Navigation>
                <Main>
                    <ListComponent spacing="64px" padding="0 0 64px 0" direction="vertical">
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
                            <Typography text="API Check" size="1.2rem"/>
                            <Typography text="Toggles API Check at startup." size="0.9rem" color="#cbcbcb" margin="0 0 8px 0"/>
                            <Toggle
                                checked={SettingsData.get("checkApi")}
                                changed={v => this.settingChanged("checkApi", v)}
                            />
                        </Grid>
                        <Grid spacing="4px" direction="vertical">
                            <Typography text="Erase Data" size="1.2rem"/>
                            <Typography text="Erasing your data will delete all saved data," size="0.9rem" color="#cbcbcb"/>
                            <Typography text="including history and other settings." size="0.9rem" color="#cbcbcb" margin="0 0 8px 0"/>
                            <Button size="small" text="Erase All Data" theme="alert"/>
                        </Grid>
                    </ListComponent>
                </Main>
            </App>
        );
    }

    settingChanged(path, newValue) {
        SettingsData.set(path, newValue);
    }
};

export default SettingsPage;