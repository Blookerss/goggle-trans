import App from '../components/App';
import Main from '../components/Main';
import Link from '../components/Link';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Translation from '../components/Translation';

import React from 'react';

class IndexPage extends React.Component {
    render() {
        return (
            <App>
                <Header text="goggle trans" icon={"/favicon.ico"} />
                <Navigation>
                    <Link to="/settings" text="Settings" icon="bi bi-gear-fill"/>
                    <Link to="/history" text="History" icon="bi bi-clock-history"/>
                    <Link to="/generator" text="Library Motor" icon="bi bi-joystick"/>
                </Navigation>
                <Main>
                    <Translation/>
                </Main>
            </App>
        );
    }
};

export default IndexPage;