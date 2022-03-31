import React from 'react';
import { GearFill, ClockHistory } from 'react-bootstrap-icons';

import App from '../components/App';
import Main from '/voxeliface/components/Main';
import Link from '/voxeliface/components/Link/Tauri';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Translation from '../components/Translation';

export default class HomePage extends React.Component {
    render() {
        return (
            <App>
                <Header/>
                <Navigation>
                    <Link to="/settings" text="Settings" icon={<GearFill/>} color="#c7c6c6"/>
                    <Link to="/history" text="History" icon={<ClockHistory/>} color="#c7c6c6"/>
                </Navigation>
                <Main>
                    <Translation/>
                </Main>
            </App>
        );
    }
};