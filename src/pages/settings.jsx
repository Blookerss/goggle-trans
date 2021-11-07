import App from '../components/App';
import Main from '../components/Main';
import Link from '../components/Link';
import Header from '../components/Header';
import Navigation from '../components/Navigation';

import React from 'react';

const DataController = window.$__DATA__;
let SettingsData; DataController.getData("settings").then(obj => SettingsData = obj);
class SettingsPage extends React.Component {
    render() {
        console.log(SettingsData);
        return (
            <App>
                <Header text="goggle trans" icon={"/favicon.ico"} />
                <Navigation>
                    <Link to="/" text="Home" icon="bi bi-house-door-fill"/>
                </Navigation>
                <Main>
                    
                </Main>
            </App>
        );
    }
};

export default SettingsPage;