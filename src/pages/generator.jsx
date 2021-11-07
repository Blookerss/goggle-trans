import App from '../components/App';
import Main from '../components/Main';
import Link from '../components/Link';
import Header from '../components/Header';
import Generator from '../components/Generator';
import Navigation from '../components/Navigation';

import React from 'react';

class GeneratorPage extends React.Component {
    render() {
        return (
            <App>
                <Header text="goggle trans" icon={"/favicon.ico"} />
                <Navigation>
                    <Link to="/" text="Home" icon="bi bi-house-door-fill"/>
                </Navigation>
                <Main>
                    <Generator/>
                </Main>
            </App>
        );
    }
};

export default GeneratorPage;