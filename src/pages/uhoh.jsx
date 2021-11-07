import App from '../components/App';
import Main from '../components/Main';
import Link from '../components/Link';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Typography from '../components/Typography';

import React from 'react';

class UhOhPage extends React.Component {
    render() {
        return (
            <App>
                <Header text="goggle trans" icon={"/favicon.ico"} />
                <Navigation>
                    <Link to="/" text="Home" icon="bi bi-house-door-fill"/>
                </Navigation>
                <Main>
                    <Typography text="george not found"/>
                </Main>
            </App>
        );
    }
};

export default UhOhPage;